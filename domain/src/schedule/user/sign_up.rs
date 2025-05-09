use std::sync::LazyLock;

use araucaria::schema::{DateSchema, EmailSchema, ObjSchema, Schema, StrSchema};

use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    session::{Session, SessionService},
};

use super::{
    error::UserErr,
    model::User,
    repository::UserRepository,
    unique_info::{UserUniqueInfo, user_create_unique_info_is_valid},
};

#[derive(Debug, PartialEq)]
pub struct UserSignUpInput {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

#[derive(Debug, PartialEq)]
pub struct UserSignUpOutput {
    pub id: String,
    pub session: Session,
}

pub static USER_SIGN_UP_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("first_name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 256))),
        ("birthdate".into(), Schema::from(DateSchema::default().unix_epoch())),
        ("email".into(), Schema::from(EmailSchema::default())),
        ("username".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 64))),
        (
            "password".into(),
            Schema::from(StrSchema::default().chars_len_btwn(1, 64).uppercase_len_ge(1).lowercase_len_ge(1).numbers_len_ge(1).symbols_len_ge(1)),
        ),
    ]))
});

fn transform_to_user(model: UserSignUpInput, id: String, created_at: String) -> User {
    User {
        id,
        first_name: model.first_name,
        birthdate: model.birthdate,
        email: model.email,
        username: model.username,
        password: model.password,
        created_at: created_at.clone(),
        updated_at: created_at,
    }
}

pub fn user_sign_up(
    repository: &dyn UserRepository,
    id_generator: &dyn IdGenerator,
    date_time_generator: &dyn DateTimeGenerator,
    session_service: &dyn SessionService,
    model: UserSignUpInput,
) -> Result<UserSignUpOutput, UserErr> {
    user_create_unique_info_is_valid(repository, &UserUniqueInfo::from(&model))?;
    let id = id_generator.generate();
    let now = date_time_generator.now_as_iso();
    let user = transform_to_user(model, id, now);
    repository.create(&user).map_err(UserErr::DB)?;
    let session = session_service.encode(&user, date_time_generator).map_err(UserErr::Session)?;
    Ok(UserSignUpOutput { id: user.id, session })
}

pub mod stub {
    use super::UserSignUpInput;

    pub fn user_sign_up_input_stub() -> UserSignUpInput {
        UserSignUpInput {
            email: "paul@gmail.com".into(),
            first_name: "Paul McCartney".into(),
            birthdate: "1942-06-18".into(),
            username: "paul_mc".into(),
            password: "asdf!@#123".into(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::{stub::user_sign_up_input_stub, transform_to_user, user_sign_up};

    use crate::{
        database::DBErr,
        generator::stub::{DateTimeGeneratorStub, IdGeneratorStub},
        schedule::user::{
            error::UserErr,
            model::User,
            sign_up::{UserSignUpInput, UserSignUpOutput},
            stub::{UserRepositoryStub, user_stub},
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        session::{
            SessionEncodeErr, SessionErr,
            stub::{SessionServiceStub, session_stub},
        },
    };

    #[test]
    fn test_transform_to_user() {
        assert_eq!(
            transform_to_user(
                UserSignUpInput {
                    email: "paul@gmail.com".into(),
                    first_name: "Paul McCartney".into(),
                    birthdate: "1942-06-18".into(),
                    username: "paul_mc".into(),
                    password: "asdf!@#123".into(),
                },
                "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                "2024-03-01T11:26Z".into(),
            ),
            User {
                id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                email: "paul@gmail.com".into(),
                first_name: "Paul McCartney".into(),
                birthdate: "1942-06-18".into(),
                username: "paul_mc".into(),
                password: "asdf!@#123".into(),
                created_at: "2024-03-01T11:26Z".into(),
                updated_at: "2024-03-01T11:26Z".into(),
            }
        );
    }

    #[test]
    fn user_sign_up_ok() {
        assert_eq!(
            user_sign_up(
                &UserRepositoryStub::default(),
                &IdGeneratorStub("a6edc906-2f9f-5fb2-a373-efac406f0ef2".into()),
                &DateTimeGeneratorStub::of_iso("2024-03-01T11:26Z".into()),
                &SessionServiceStub::default(),
                user_sign_up_input_stub()
            ),
            Ok(UserSignUpOutput { id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(), session: session_stub() })
        );
    }

    #[test]
    fn user_sign_up_err() {
        assert_eq!(
            user_sign_up(
                &UserRepositoryStub::of_db_err(),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub::of_iso(user_stub().created_at),
                &SessionServiceStub::default(),
                user_sign_up_input_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_sign_up(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 2, email: 2 }),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub::of_iso(user_stub().created_at),
                &SessionServiceStub::default(),
                user_sign_up_input_stub()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: true }))
        );
        assert_eq!(
            user_sign_up(
                &UserRepositoryStub::default(),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub::of_iso(user_stub().created_at),
                &SessionServiceStub::of_session_err(),
                user_sign_up_input_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

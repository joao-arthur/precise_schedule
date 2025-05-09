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
pub struct UserCreateInput {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

#[derive(Debug, PartialEq)]
pub struct UserCreateOutput {
    pub id: String,
    pub session: Session,
}

pub static USER_CREATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
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

fn user_create_input_to_user(model: UserCreateInput, id: String, created_at: String) -> User {
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

pub fn user_create(
    repository: &dyn UserRepository,
    id_generator: &dyn IdGenerator,
    date_time_generator: &dyn DateTimeGenerator,
    session_service: &dyn SessionService,
    model: UserCreateInput,
) -> Result<UserCreateOutput, UserErr> {
    user_create_unique_info_is_valid(repository, &UserUniqueInfo::from(&model))?;
    let id = id_generator.generate();
    let now = date_time_generator.now_as_iso();
    let user = user_create_input_to_user(model, id, now);
    repository.create(&user).map_err(UserErr::DB)?;
    let session = session_service.encode(&user, date_time_generator).map_err(UserErr::Session)?;
    Ok(UserCreateOutput { id: user.id, session })
}

pub mod stub {
    use super::UserCreateInput;

    pub fn user_create_input_stub() -> UserCreateInput {
        UserCreateInput {
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
    use super::{stub::user_create_input_stub, user_create, user_create_input_to_user};

    use crate::{
        database::DBErr,
        generator::stub::{DateTimeGeneratorStub, IdGeneratorStub},
        schedule::user::{
            create::UserCreateOutput,
            error::UserErr,
            model::User,
            stub::{UserRepositoryStub, user_stub},
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        session::{
            SessionEncodeErr, SessionErr,
            stub::{SessionServiceStub, session_stub},
        },
    };

    #[test]
    fn test_user_create_input_to_user() {
        assert_eq!(
            user_create_input_to_user(user_create_input_stub(), user_stub().id, user_stub().created_at),
            User { updated_at: "2024-03-01T11:26Z".into(), ..user_stub() }
        );
    }

    #[test]
    fn user_create_ok() {
        assert_eq!(
            user_create(
                &UserRepositoryStub::default(),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_create_input_stub()
            ),
            Ok(UserCreateOutput { id: user_stub().id, session: session_stub() })
        );
    }

    #[test]
    fn user_create_err() {
        assert_eq!(
            user_create(
                &UserRepositoryStub::of_db_err(),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_create_input_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_create(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 2, email: 2 }),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_create_input_stub()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: true }))
        );
        assert_eq!(
            user_create(
                &UserRepositoryStub::default(),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::of_session_err(),
                user_create_input_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

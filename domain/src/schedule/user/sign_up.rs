use std::sync::LazyLock;

use araucaria::schema::{DateSchema, EmailSchema, ObjSchema, Schema, StrSchema};

use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    session::{Session, SessionEncodeService},
};

use super::{
    error::UserErr,
    model::User,
    repository::UserRepository,
    unique_info::{UserUniqueInfo, user_sign_up_unique_info_is_valid},
};

#[derive(Debug, PartialEq)]
pub struct UserSignUpInput {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

pub static USER_SIGN_UP_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("first_name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 256))),
        ("birthdate".into(), Schema::from(DateSchema::default().unix_epoch())),
        ("email".into(), Schema::from(EmailSchema::default())),
        ("username".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 64))),
        (
            "password".into(),
            Schema::from(
                StrSchema::default()
                    .chars_len_btwn(1, 64)
                    .uppercase_len_ge(1)
                    .lowercase_len_ge(1)
                    .numbers_len_ge(1)
                    .symbols_len_ge(1),
            ),
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

pub async fn user_sign_up<
    Repo: UserRepository,
    IdGen: IdGenerator,
    DtTmGen: DateTimeGenerator,
    SessionEnc: SessionEncodeService,
>(
    repository: &Repo,
    id_generator: &IdGen,
    date_time_generator: &DtTmGen,
    session_encode_service: &SessionEnc,
    model: UserSignUpInput,
) -> Result<Session, UserErr> {
    user_sign_up_unique_info_is_valid(repository, &UserUniqueInfo::from(&model)).await?;
    let id = id_generator.generate();
    let now = date_time_generator.now_as_iso();
    let user = transform_to_user(model, id, now);
    repository.create(&user).await.map_err(UserErr::DB)?;
    let session =
        session_encode_service.encode(&user, date_time_generator).map_err(UserErr::Session)?;
    Ok(session)
}

mod stub {
    use super::UserSignUpInput;

    pub fn user_sign_up_input_stub() -> UserSignUpInput {
        UserSignUpInput {
            email: "paul@gmail.com".into(),
            first_name: "Paul McCartney".into(),
            birthdate: "1942-06-18".into(),
            username: "macca".into(),
            password: "asdf!@#123".into(),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        generator::stub::{DateTimeGeneratorStub, IdGeneratorStub},
        schedule::user::{
            error::UserErr,
            model::User,
            repository::stub::UserRepositoryStub,
            sign_up::UserSignUpInput,
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        session::{Session, SessionEncodeErr, SessionErr, stub::SessionEncodeServiceStub},
    };

    use super::{stub::user_sign_up_input_stub, transform_to_user, user_sign_up};

    #[test]
    fn test_transform_to_user() {
        assert_eq!(
            transform_to_user(
                UserSignUpInput {
                    email: "paul@gmail.com".into(),
                    first_name: "Paul McCartney".into(),
                    birthdate: "1942-06-18".into(),
                    username: "macca".into(),
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
                username: "macca".into(),
                password: "asdf!@#123".into(),
                created_at: "2024-03-01T11:26Z".into(),
                updated_at: "2024-03-01T11:26Z".into(),
            }
        );
    }

    #[tokio::test]
    async fn user_sign_up_ok() {
        assert_eq!(
            user_sign_up(
                &UserRepositoryStub::default(),
                &IdGeneratorStub("a6edc906-2f9f-5fb2-a373-efac406f0ef2".into()),
                &DateTimeGeneratorStub::of_iso("2024-03-01T11:26Z".into()),
                &SessionEncodeServiceStub::of_token("TENGO SUERTE".into()),
                user_sign_up_input_stub()
            )
            .await,
            Ok(Session { token: "TENGO SUERTE".into() })
        );
    }

    #[tokio::test]
    async fn user_sign_up_db_err() {
        assert_eq!(
            user_sign_up(
                &UserRepositoryStub::of_db_err(),
                &IdGeneratorStub("a6edc906-2f9f-5fb2-a373-efac406f0ef2".into()),
                &DateTimeGeneratorStub::of_iso("2024-03-01T11:26Z".into()),
                &SessionEncodeServiceStub::of_token("TENGO SUERTE".into()),
                user_sign_up_input_stub()
            )
            .await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_sign_up_user_unique_info_field_err() {
        assert_eq!(
            user_sign_up(
                &UserRepositoryStub::of_unique_info_count(UserUniqueInfoCount {
                    username: 2,
                    email: 2
                }),
                &IdGeneratorStub("a6edc906-2f9f-5fb2-a373-efac406f0ef2".into()),
                &DateTimeGeneratorStub::of_iso("2024-03-01T11:26Z".into()),
                &SessionEncodeServiceStub::of_token("TENGO SUERTE".into()),
                user_sign_up_input_stub()
            )
            .await,
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: true
            }))
        );
    }

    #[tokio::test]
    async fn user_sign_up_session_encode_err() {
        assert_eq!(
            user_sign_up(
                &UserRepositoryStub::default(),
                &IdGeneratorStub("a6edc906-2f9f-5fb2-a373-efac406f0ef2".into()),
                &DateTimeGeneratorStub::of_iso("2024-03-01T11:26Z".into()),
                &SessionEncodeServiceStub::of_err(),
                user_sign_up_input_stub()
            )
            .await,
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

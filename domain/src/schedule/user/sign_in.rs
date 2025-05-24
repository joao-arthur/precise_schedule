use std::sync::LazyLock;

use araucaria::schema::{ObjSchema, Schema, StrSchema};

use crate::{
    generator::DateTimeGenerator,
    session::{Session, SessionEncodeService},
};

use super::{
    error::UserErr, model::UserCredentials, read::user_read_by_credentials,
    repository::UserRepository,
};

pub static USER_CREDENTIALS_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("username".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 64))),
        (
            "password".into(),
            Schema::from(
                StrSchema::default()
                    .chars_len_btwn(1, 64)
                    .uppercase_len_gt(1)
                    .lowercase_len_gt(1)
                    .numbers_len_gt(1)
                    .symbols_len_gt(1),
            ),
        ),
    ]))
});

pub async fn user_sign_in<
    Repo: UserRepository,
    DtTmGen: DateTimeGenerator,
    SessionEnc: SessionEncodeService,
>(
    repository: &Repo,
    date_time_generator: &DtTmGen,
    session_encode_service: &SessionEnc,
    model: UserCredentials,
) -> Result<Session, UserErr> {
    let user = user_read_by_credentials(repository, &model).await?;
    let session = session_encode_service
        .encode(&user, date_time_generator)
        .map_err(UserErr::EncodeSession)?;
    Ok(session)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        generator::stub::DateTimeGeneratorStub,
        schedule::user::{
            error::UserErr,
            model::stub::{user_credentials_stub, user_stub},
            repository::stub::UserRepositoryStub,
        },
        session::{Session, SessionEncodeErr, stub::SessionEncodeServiceStub},
    };

    use super::user_sign_in;

    #[tokio::test]
    async fn user_sign_in_ok() {
        assert_eq!(
            user_sign_in(
                &UserRepositoryStub::of_user(user_stub()),
                &DateTimeGeneratorStub::of_iso("2024-12-18T18:02Z".into()),
                &SessionEncodeServiceStub::of_token("TENGO SUERTE".into()),
                user_credentials_stub()
            )
            .await,
            Ok(Session { token: "TENGO SUERTE".into() })
        );
    }

    #[tokio::test]
    async fn user_sign_in_db_err() {
        assert_eq!(
            user_sign_in(
                &UserRepositoryStub::of_db_err(),
                &DateTimeGeneratorStub::of_iso("2024-12-18T18:02Z".into()),
                &SessionEncodeServiceStub::of_token("TENGO SUERTE".into()),
                user_credentials_stub()
            )
            .await,
            Err(UserErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn user_sign_in_encode_err() {
        assert_eq!(
            user_sign_in(
                &UserRepositoryStub::of_user(user_stub()),
                &DateTimeGeneratorStub::of_iso("2024-12-18T18:02Z".into()),
                &SessionEncodeServiceStub::of_err(),
                user_credentials_stub()
            )
            .await,
            Err(UserErr::EncodeSession(SessionEncodeErr))
        );
    }
}

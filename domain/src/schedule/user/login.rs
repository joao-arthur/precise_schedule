use std::sync::LazyLock;

use araucaria::schema::{ObjSchema, Schema, StrSchema};

use crate::{
    generator::DateTimeGenerator,
    session::{Session, SessionService},
};

use super::{error::UserErr, read::user_read_by_credentials, repository::UserRepository};

#[derive(Debug, PartialEq)]
pub struct UserCredentials {
    pub username: String,
    pub password: String,
}

pub static USER_SIGN_IN_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("username".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 64))),
        (
            "password".into(),
            Schema::from(StrSchema::default().chars_len_btwn(1, 64).uppercase_len_gt(1).lowercase_len_gt(1).numbers_len_gt(1).symbols_len_gt(1)),
        ),
    ]))
});

pub fn user_sign_in(
    repository: &dyn UserRepository,
    date_time_generator: &dyn DateTimeGenerator,
    session_service: &dyn SessionService,
    model: UserCredentials,
) -> Result<Session, UserErr> {
    let user = user_read_by_credentials(repository, &model)?;
    let session = session_service.encode(&user, date_time_generator).map_err(UserErr::Session)?;
    Ok(session)
}

pub mod stub {
    use super::UserCredentials;

    pub fn user_credentials_stub() -> UserCredentials {
        UserCredentials { username: "paul_mc".into(), password: "asdf!@#123".into() }
    }
}

#[cfg(test)]
mod tests {
    use super::{stub::user_credentials_stub, user_sign_in};

    use crate::{
        database::DBErr,
        generator::stub::DateTimeGeneratorStub,
        schedule::user::{error::UserErr, stub::UserRepositoryStub},
        session::{
            SessionEncodeErr, SessionErr,
            stub::{SessionServiceStub, session_stub},
        },
    };

    #[test]
    fn user_login_ok() {
        assert_eq!(
            user_sign_in(
                &UserRepositoryStub::default(),
                &DateTimeGeneratorStub("2024-12-18T18:02Z".into(), 1734555761),
                &SessionServiceStub::default(),
                user_credentials_stub()
            ),
            Ok(session_stub())
        );
    }

    #[test]
    fn user_login_err() {
        assert_eq!(
            user_sign_in(
                &UserRepositoryStub::of_db_err(),
                &DateTimeGeneratorStub("2024-12-18T18:02Z".into(), 1734555761),
                &SessionServiceStub::default(),
                user_credentials_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_sign_in(
                &UserRepositoryStub::default(),
                &DateTimeGeneratorStub("2024-12-18T18:02Z".into(), 1734555761),
                &SessionServiceStub::of_session_err(),
                user_credentials_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

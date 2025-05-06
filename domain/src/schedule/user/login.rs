use std::{collections::BTreeMap, sync::LazyLock};

use araucaria::validation::{ObjValidation, StrValidation, Validation};

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

pub static USER_LOGIN_SCHEMA: LazyLock<Validation> = LazyLock::new(|| {
    Validation::Obj(ObjValidation::default().validation(BTreeMap::from([
        ("username".into(), Validation::Str(StrValidation::default().chars_len_btwn(1, 64))),
        (
            "password".into(),
            Validation::Str(
                StrValidation::default().chars_len_btwn(1, 64).uppercase_len_gt(1).lowercase_len_gt(1).numbers_len_gt(1).symbols_len_gt(1),
            ),
        ),
    ])))
});

pub fn user_login(
    repository: &dyn UserRepository,
    date_time_generator: &dyn DateTimeGenerator,
    session_service: &dyn SessionService,
    user_credentials: UserCredentials,
) -> Result<Session, UserErr> {
    let user = user_read_by_credentials(repository, &user_credentials)?;
    let session = session_service.encode(&user, date_time_generator).map_err(UserErr::Session)?;
    Ok(session)
}

#[cfg(test)]
mod tests {
    use super::user_login;
    use crate::{
        database::DBErr,
        generator::stub::DateTimeGeneratorStub,
        schedule::user::{
            error::UserErr,
            stub::{UserRepositoryStub, user_credentials_stub},
        },
        session::{
            SessionEncodeErr, SessionErr,
            stub::{SessionServiceStub, session_stub},
        },
    };

    #[test]
    fn user_login_ok() {
        assert_eq!(
            user_login(
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
            user_login(
                &UserRepositoryStub::of_db_err(),
                &DateTimeGeneratorStub("2024-12-18T18:02Z".into(), 1734555761),
                &SessionServiceStub::default(),
                user_credentials_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_login(
                &UserRepositoryStub::default(),
                &DateTimeGeneratorStub("2024-12-18T18:02Z".into(), 1734555761),
                &SessionServiceStub::of_session_err(),
                user_credentials_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

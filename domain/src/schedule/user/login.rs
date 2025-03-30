use std::{collections::HashMap, sync::LazyLock};

use araucaria::validation::{str::StrValidation, ObjValidation, Validation};

use crate::{
    generator::DateTimeGen,
    session::{Session, SessionService},
};

use super::{error::UserErr, read::user_r_by_cred, repo::UserRepo};

#[derive(Debug, PartialEq)]
pub struct UserCred {
    pub username: String,
    pub password: String,
}

pub static USER_LOGIN_SCHEMA: LazyLock<Validation> = LazyLock::new(|| {
    Validation::Obj(
        ObjValidation::default().validation(HashMap::from([
            (
                "username",
                Validation::Str(
                    StrValidation::default().min_graphemes_len(1).max_graphemes_len(64),
                ),
            ),
            (
                "password",
                Validation::Str(
                    StrValidation::default()
                        .min_graphemes_len(1)
                        .max_graphemes_len(64)
                        .min_uppercase_len(1)
                        .min_lowercase_len(1)
                        .min_number_len(1)
                        .min_symbols_len(1),
                ),
            ),
        ])),
    )
});

pub fn user_login(
    repo: &dyn UserRepo,
    date_time_gen: &dyn DateTimeGen,
    session_service: &dyn SessionService,
    user_cred: UserCred,
) -> Result<Session, UserErr> {
    let user = user_r_by_cred(repo, &user_cred)?;
    let session = session_service.encode(&user, date_time_gen).map_err(UserErr::Session)?;
    Ok(session)
}

#[cfg(test)]
mod test {
    use crate::{
        database::DBErr,
        generator::stub::DateTimeGenStub,
        schedule::user::stub::{user_cred_stub, UserRepoStub},
        session::{
            stub::{session_stub, SessionServiceStub},
            SessionEncodeErr, SessionErr,
        },
    };

    use super::*;

    #[test]
    fn test_user_login_ok() {
        assert_eq!(
            user_login(
                &UserRepoStub::default(),
                &DateTimeGenStub(String::from("2024-12-18T18:02Z"), 1734555761),
                &SessionServiceStub::default(),
                user_cred_stub()
            ),
            Ok(session_stub())
        );
    }

    #[test]
    fn test_user_login_err() {
        assert_eq!(
            user_login(
                &UserRepoStub::of_db_err(),
                &DateTimeGenStub(String::from("2024-12-18T18:02Z"), 1734555761),
                &SessionServiceStub::default(),
                user_cred_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_login(
                &UserRepoStub::default(),
                &DateTimeGenStub(String::from("2024-12-18T18:02Z"), 1734555761),
                &SessionServiceStub::of_session_err(),
                user_cred_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

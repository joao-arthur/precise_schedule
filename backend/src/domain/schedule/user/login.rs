use std::{collections::HashMap, sync::LazyLock};

use crate::domain::{
    generator::DateTimeGen,
    session::{Session, SessionService},
    validation::{Schema, Val, Validator, V},
};

use super::{error::UserErr, read::user_r_by_cred, repo::UserRepo};

#[derive(Debug, PartialEq)]
pub struct UserCred {
    pub username: String,
    pub password: String,
}

static USER_LOGIN_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    HashMap::from([
        ("username", vec![V::Required, V::Str, V::StrMinLen(1), V::StrMaxLen(32)]),
        (
            "password",
            vec![
                V::Required,
                V::Str,
                V::StrMinLen(1),
                V::StrMaxLen(32),
                V::StrMinUpper(1),
                V::StrMinLower(1),
                V::StrMinSpecial(1),
                V::StrMinNum(1),
            ],
        ),
    ])
});

pub fn user_login(
    validator: &dyn Validator,
    repo: &dyn UserRepo,
    date_time_gen: &dyn DateTimeGen,
    session_service: &dyn SessionService,
    user_cred: UserCred,
) -> Result<Session, UserErr> {
    let input_value = Val::Obj(HashMap::from([
        (String::from("username"), Val::Str(user_cred.username.clone())),
        (String::from("password"), Val::Str(user_cred.password.clone())),
    ]));
    validator.validate(&USER_LOGIN_SCHEMA, &input_value).map_err(UserErr::Schema)?;
    let user = user_r_by_cred(repo, &user_cred)?;
    let session = session_service.encode(&user, date_time_gen).map_err(UserErr::Session)?;
    Ok(session)
}

#[cfg(test)]
mod test {
    use crate::domain::{
        database::DBErr,
        generator::stub::DateTimeGenStub,
        schedule::user::stub::{user_cred_stub, UserRepoStub},
        session::{
            stub::{session_stub, SessionServiceStub},
            SessionEncodeErr, SessionErr,
        },
        validation::stub::ValidatorStub,
    };

    use super::*;

    #[test]
    fn test_user_login_ok() {
        assert_eq!(
            user_login(
                &ValidatorStub(Ok(())),
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
                &ValidatorStub(Ok(())),
                &UserRepoStub::of_db_err(),
                &DateTimeGenStub(String::from("2024-12-18T18:02Z"), 1734555761),
                &SessionServiceStub::default(),
                user_cred_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_login(
                &ValidatorStub(Err(HashMap::from([("first_name", vec![V::Required])]))),
                &UserRepoStub::default(),
                &DateTimeGenStub(String::from("2024-12-18T18:02Z"), 1734555761),
                &SessionServiceStub::default(),
                user_cred_stub()
            ),
            Err(UserErr::Schema(HashMap::from([("first_name", vec![V::Required])])))
        );
        assert_eq!(
            user_login(
                &ValidatorStub(Ok(())),
                &UserRepoStub::default(),
                &DateTimeGenStub(String::from("2024-12-18T18:02Z"), 1734555761),
                &SessionServiceStub::of_session_err(),
                user_cred_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

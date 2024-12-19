use std::{collections::HashMap, sync::LazyLock};

use crate::domain::{
    generator::DateTimeGen,
    session::{Session, SessionService},
    validation::{Schema, Validator, Value, V},
};

use super::{
    error::UserErr,
    model::User,
    read_by_id::user_r_by_id,
    repo::UserRepo,
    unique_info::{user_u_unique_info_is_valid, UserUniqueInfo},
};

pub struct UserU {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

#[derive(Debug, PartialEq)]
pub struct UserUResult {
    pub user: User,
    pub session: Session,
}

static USER_U_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    HashMap::from([
        ("first_name", vec![V::Required, V::Str, V::StrMinLen(1), V::StrMaxLen(256)]),
        ("birthdate", vec![V::Required, V::Str, V::Dt, V::DtMin(String::from("1970-01-01"))]),
        ("email", vec![V::Required, V::Str, V::Email]),
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

fn user_from_u(user_u: UserU, user: User, updated_at: String) -> User {
    User {
        id: user.id,
        first_name: user_u.first_name,
        birthdate: user_u.birthdate,
        email: user_u.email,
        username: user_u.username,
        password: user_u.password,
        created_at: user.created_at,
        updated_at,
    }
}

pub fn user_u(
    validator: &dyn Validator,
    repo: &dyn UserRepo,
    date_time_gen: &dyn DateTimeGen,
    session_service: &dyn SessionService,
    id: String,
    user_u: UserU,
) -> Result<UserUResult, UserErr> {
    let input_value = Value::Obj(HashMap::from([
        (String::from("first_name"), Value::Str(user_u.first_name.clone())),
        (String::from("birthdate"), Value::Str(user_u.birthdate.clone())),
        (String::from("email"), Value::Str(user_u.email.clone())),
        (String::from("username"), Value::Str(user_u.username.clone())),
        (String::from("password"), Value::Str(user_u.password.clone())),
    ]));
    validator.validate(&USER_U_SCHEMA, &input_value).map_err(UserErr::Schema)?;
    let old_user = user_r_by_id(repo, &id)?;
    user_u_unique_info_is_valid(
        repo,
        &UserUniqueInfo::from(&user_u),
        &UserUniqueInfo::from(&old_user),
    )?;
    let now = date_time_gen.now_as_iso();
    let user = user_from_u(user_u, old_user, now);
    repo.u(&user).map_err(UserErr::DB)?;
    let session = session_service.encode(&user, date_time_gen).map_err(UserErr::Session)?;
    Ok(UserUResult { user, session })
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::{
        database::DBErr,
        generator::stub::DateTimeGenStub,
        schedule::user::{
            read_by_id::UserIdNotFound,
            stub::{user_after_u_stub, user_stub, user_u_stub, UserRepoStub},
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        session::{
            stub::{session_stub, SessionServiceStub},
            SessionEncodeErr, SessionErr,
        },
        validation::{stub::ValidatorStub, VErr},
    };

    #[test]
    fn test_user_from_c() {
        assert_eq!(
            user_from_u(user_u_stub(), user_stub(), user_stub().updated_at),
            user_after_u_stub()
        );
    }

    #[test]
    fn test_user_u_ok() {
        assert_eq!(
            user_u(
                &ValidatorStub(Ok(())),
                &UserRepoStub::default(),
                &DateTimeGenStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_u_stub()
            ),
            Ok(UserUResult { user: user_after_u_stub(), session: session_stub() })
        );
    }

    #[test]
    fn test_user_u_err() {
        assert_eq!(
            user_u(
                &ValidatorStub(Ok(())),
                &UserRepoStub::of_db_err(),
                &DateTimeGenStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_u_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_u(
                &ValidatorStub(Ok(())),
                &UserRepoStub::of_1(None),
                &DateTimeGenStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_u_stub()
            ),
            Err(UserErr::UserIdNotFound(UserIdNotFound))
        );
        assert_eq!(
            user_u(
                &ValidatorStub(Err(HashMap::from([(
                    String::from("first_name"),
                    vec![VErr::Required]
                )]))),
                &UserRepoStub::default(),
                &DateTimeGenStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_u_stub()
            ),
            Err(UserErr::Schema(HashMap::from([(
                String::from("first_name"),
                vec![VErr::Required]
            )])))
        );
        assert_eq!(
            user_u(
                &ValidatorStub(Ok(())),
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 2, email: 2 }),
                &DateTimeGenStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_u_stub()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: true
            }))
        );
        assert_eq!(
            user_u(
                &ValidatorStub(Ok(())),
                &UserRepoStub::default(),
                &DateTimeGenStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::of_session_err(),
                user_stub().id,
                user_u_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

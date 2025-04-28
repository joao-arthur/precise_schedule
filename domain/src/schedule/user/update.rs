use std::{collections::HashMap, sync::LazyLock};

use araucaria::validation::{date::DateValidation, email::EmailValidation, str::StrValidation, ObjValidation, Validation};

use crate::{
    generator::DateTimeGen,
    session::{Session, SessionService},
};

use super::{
    error::UserErr,
    model::User,
    read::user_r_by_id,
    repo::UserRepo,
    unique_info::{user_u_unique_info_is_valid, UserUniqueInfo},
};

#[derive(Debug, PartialEq)]
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

pub static USER_U_SCHEMA: LazyLock<Validation> = LazyLock::new(|| {
    Validation::Obj(ObjValidation::default().validation(HashMap::from([
        (String::from("first_name"), Validation::Str(StrValidation::default().chars_len_btwn(1, 256))),
        (String::from("birthdate"), Validation::Date(DateValidation::default().ge(String::from("1970-01-01")))),
        (String::from("email"), Validation::Email(EmailValidation::default())),
        (String::from("username"), Validation::Str(StrValidation::default().chars_len_btwn(1, 64))),
        (
            String::from("password"),
            Validation::Str(
                StrValidation::default().chars_len_btwn(1, 64).uppercase_len_gt(1).lowercase_len_gt(1).numbers_len_gt(1).symbols_len_gt(1),
            ),
        ),
    ])))
});

fn user_from_u(user_u: UserU, user: User, updated_at: String) -> User {
    User {
        first_name: user_u.first_name,
        birthdate: user_u.birthdate,
        email: user_u.email,
        username: user_u.username,
        password: user_u.password,
        updated_at,
        ..user
    }
}

pub fn user_u(
    repo: &dyn UserRepo,
    date_time_gen: &dyn DateTimeGen,
    session_service: &dyn SessionService,
    id: String,
    user_u: UserU,
) -> Result<UserUResult, UserErr> {
    let old_user = user_r_by_id(repo, &id)?;
    user_u_unique_info_is_valid(repo, &UserUniqueInfo::from(&user_u), &UserUniqueInfo::from(&old_user))?;
    let now = date_time_gen.now_as_iso();
    let user = user_from_u(user_u, old_user, now);
    repo.u(&user).map_err(UserErr::DB)?;
    let session = session_service.encode(&user, date_time_gen).map_err(UserErr::Session)?;
    Ok(UserUResult { user, session })
}

#[cfg(test)]
mod test {
    use super::{user_from_u, user_u, UserUResult};
    use crate::{
        database::DBErr,
        generator::stub::DateTimeGenStub,
        schedule::user::{
            error::UserErr,
            read::UserIdNotFoundErr,
            stub::{user_after_u_stub, user_stub, user_u_stub, UserRepoStub},
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        session::{
            stub::{session_stub, SessionServiceStub},
            SessionEncodeErr, SessionErr,
        },
    };

    #[test]
    fn test_user_from_u() {
        assert_eq!(user_from_u(user_u_stub(), user_stub(), user_stub().updated_at), user_after_u_stub());
    }

    #[test]
    fn test_user_u_ok() {
        assert_eq!(
            user_u(
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
                &UserRepoStub::of_none(),
                &DateTimeGenStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_u_stub()
            ),
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
        assert_eq!(
            user_u(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 2, email: 2 }),
                &DateTimeGenStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_u_stub()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: true }))
        );
        assert_eq!(
            user_u(
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

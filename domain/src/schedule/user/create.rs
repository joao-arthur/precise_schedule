use std::{collections::BTreeMap, sync::LazyLock};

use araucaria::validation::{DateValidation, EmailValidation, ObjValidation, StrValidation, Validation};

use crate::{
    generator::{DateTimeGen, IdGen},
    session::{Session, SessionService},
};

use super::{
    error::UserErr,
    model::User,
    repo::UserRepo,
    unique_info::{UserUniqueInfo, user_c_unique_info_is_valid},
};

#[derive(Debug, PartialEq)]
pub struct UserC {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

#[derive(Debug, PartialEq)]
pub struct UserCResult {
    pub user: User,
    pub session: Session,
}

pub static USER_C_SCHEMA: LazyLock<Validation> = LazyLock::new(|| {
    Validation::Obj(ObjValidation::default().validation(BTreeMap::from([
        ("first_name".into(), Validation::Str(StrValidation::default().chars_len_btwn(1, 256))),
        ("birthdate".into(), Validation::Date(DateValidation::default().ge("1970-01-01".into()))),
        ("email".into(), Validation::Email(EmailValidation::default())),
        ("username".into(), Validation::Str(StrValidation::default().chars_len_btwn(1, 64))),
        (
            "password".into(),
            Validation::Str(
                StrValidation::default().chars_len_btwn(1, 64).uppercase_len_gt(1).lowercase_len_gt(1).numbers_len_gt(1).symbols_len_gt(1),
            ),
        ),
    ])))
});

fn user_from_c(user_c: UserC, id: String, created_at: String) -> User {
    User {
        id,
        first_name: user_c.first_name,
        birthdate: user_c.birthdate,
        email: user_c.email,
        username: user_c.username,
        password: user_c.password,
        created_at: created_at.clone(),
        updated_at: created_at,
    }
}

pub fn user_c(
    repo: &dyn UserRepo,
    id_gen: &dyn IdGen,
    date_time_gen: &dyn DateTimeGen,
    session_service: &dyn SessionService,
    user_c: UserC,
) -> Result<UserCResult, UserErr> {
    user_c_unique_info_is_valid(repo, &UserUniqueInfo::from(&user_c))?;
    let id = id_gen.generate();
    let now = date_time_gen.now_as_iso();
    let user = user_from_c(user_c, id, now);
    repo.c(&user).map_err(UserErr::DB)?;
    let session = session_service.encode(&user, date_time_gen).map_err(UserErr::Session)?;
    Ok(UserCResult { user, session })
}

#[cfg(test)]
mod test {
    use super::{UserCResult, user_c, user_from_c};
    use crate::{
        database::DBErr,
        generator::stub::{DateTimeGenStub, IdGenStub},
        schedule::user::{
            error::UserErr,
            stub::{UserRepoStub, user_after_c_stub, user_c_stub, user_stub},
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        session::{
            SessionEncodeErr, SessionErr,
            stub::{SessionServiceStub, session_stub},
        },
    };

    #[test]
    fn test_user_from_c() {
        assert_eq!(user_from_c(user_c_stub(), user_stub().id, user_stub().created_at), user_after_c_stub());
    }

    #[test]
    fn test_user_c_ok() {
        assert_eq!(
            user_c(
                &UserRepoStub::default(),
                &IdGenStub(user_stub().id),
                &DateTimeGenStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_c_stub()
            ),
            Ok(UserCResult { user: user_after_c_stub(), session: session_stub() })
        );
    }

    #[test]
    fn test_user_c_err() {
        assert_eq!(
            user_c(
                &UserRepoStub::of_db_err(),
                &IdGenStub(user_stub().id),
                &DateTimeGenStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_c_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_c(
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 2, email: 2 }),
                &IdGenStub(user_stub().id),
                &DateTimeGenStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_c_stub()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: true }))
        );
        assert_eq!(
            user_c(
                &UserRepoStub::default(),
                &IdGenStub(user_stub().id),
                &DateTimeGenStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::of_session_err(),
                user_c_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

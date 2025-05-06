use std::{collections::BTreeMap, sync::LazyLock};

use araucaria::validation::{DateValidation, EmailValidation, ObjValidation, StrValidation, Validation};

use crate::{
    generator::DateTimeGenerator,
    session::{Session, SessionService},
};

use super::{
    error::UserErr,
    model::User,
    read::user_read_by_id,
    repository::UserRepository,
    unique_info::{UserUniqueInfo, user_update_unique_info_is_valid},
};

#[derive(Debug, PartialEq)]
pub struct UserUpdate {
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

pub static USER_UPDATE_SCHEMA: LazyLock<Validation> = LazyLock::new(|| {
    Validation::Obj(ObjValidation::default().validation(BTreeMap::from([
        ("first_name".into(), Validation::Str(StrValidation::default().chars_len_btwn(1, 256))),
        ("birthdate".into(), Validation::Date(DateValidation::default().ge("1970-01-01".into()))),
        ("email".into(), Validation::Email(EmailValidation::default())),
        ("username".into(), Validation::Str(StrValidation::default().chars_len_btwn(1, 64))),
        (
            "password".into(),
            Validation::Str(
                StrValidation::default().chars_len_btwn(1, 64).uppercase_len_ge(1).lowercase_len_ge(1).numbers_len_ge(1).symbols_len_ge(1),
            ),
        ),
    ])))
});

fn user_from_update(user_update: UserUpdate, user: User, updated_at: String) -> User {
    User {
        first_name: user_update.first_name,
        birthdate: user_update.birthdate,
        email: user_update.email,
        username: user_update.username,
        password: user_update.password,
        updated_at,
        ..user
    }
}

pub fn user_update(
    repository: &dyn UserRepository,
    date_time_generator: &dyn DateTimeGenerator,
    session_service: &dyn SessionService,
    id: String,
    user_update: UserUpdate,
) -> Result<UserUResult, UserErr> {
    let old_user = user_read_by_id(repository, &id)?;
    user_update_unique_info_is_valid(repository, &UserUniqueInfo::from(&user_update), &UserUniqueInfo::from(&old_user))?;
    let now = date_time_generator.now_as_iso();
    let user = user_from_update(user_update, old_user, now);
    repository.update(&user).map_err(UserErr::DB)?;
    let session = session_service.encode(&user, date_time_generator).map_err(UserErr::Session)?;
    Ok(UserUResult { user, session })
}

#[cfg(test)]
mod tests {
    use super::{UserUResult, user_from_update, user_update};
    use crate::{
        database::DBErr,
        generator::stub::DateTimeGeneratorStub,
        schedule::user::{
            error::UserErr,
            read::UserIdNotFoundErr,
            stub::{UserRepositoryStub, user_after_update_stub, user_stub, user_update_stub},
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        session::{
            SessionEncodeErr, SessionErr,
            stub::{SessionServiceStub, session_stub},
        },
    };

    #[test]
    fn test_user_from_update() {
        assert_eq!(user_from_update(user_update_stub(), user_stub(), user_stub().updated_at), user_after_update_stub());
    }

    #[test]
    fn user_update_ok() {
        assert_eq!(
            user_update(
                &UserRepositoryStub::default(),
                &DateTimeGeneratorStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_update_stub()
            ),
            Ok(UserUResult { user: user_after_update_stub(), session: session_stub() })
        );
    }

    #[test]
    fn user_update_err() {
        assert_eq!(
            user_update(
                &UserRepositoryStub::of_db_err(),
                &DateTimeGeneratorStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_update_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_update(
                &UserRepositoryStub::of_none(),
                &DateTimeGeneratorStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_update_stub()
            ),
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
        assert_eq!(
            user_update(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 2, email: 2 }),
                &DateTimeGeneratorStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::default(),
                user_stub().id,
                user_update_stub()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: true }))
        );
        assert_eq!(
            user_update(
                &UserRepositoryStub::default(),
                &DateTimeGeneratorStub(user_stub().updated_at, 1734555761),
                &SessionServiceStub::of_session_err(),
                user_stub().id,
                user_update_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

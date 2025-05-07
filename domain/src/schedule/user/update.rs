use std::sync::LazyLock;

use araucaria::schema::{DateSchema, EmailSchema, ObjSchema, Schema, StrSchema};

use crate::{
    generator::DateTimeGenerator,
    session::{Session, SessionService},
};

use super::{
    error::UserErr,
    model::User,
    read::{UserInfo, user_read_by_id},
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
pub struct UserUpdateResult {
    pub user: UserInfo,
    pub session: Session,
}

pub static USER_UPDATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("first_name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 256))),
        ("birthdate".into(), Schema::from(DateSchema::default().unix_epoch())),
        ("email".into(), Schema::from(EmailSchema::default())),
        ("username".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 64))),
        (
            "password".into(),
            Schema::from(StrSchema::default().chars_len_btwn(1, 64).uppercase_len_ge(1).lowercase_len_ge(1).numbers_len_ge(1).symbols_len_ge(1)),
        ),
    ]))
});

fn user_of_update(model: UserUpdate, user: User, updated_at: String) -> User {
    User {
        first_name: model.first_name,
        birthdate: model.birthdate,
        email: model.email,
        username: model.username,
        password: model.password,
        updated_at,
        ..user
    }
}

pub fn user_update(
    repository: &dyn UserRepository,
    date_time_generator: &dyn DateTimeGenerator,
    session_service: &dyn SessionService,
    id: String,
    model: UserUpdate,
) -> Result<UserUpdateResult, UserErr> {
    let old_user = user_read_by_id(repository, &id)?;
    user_update_unique_info_is_valid(repository, &UserUniqueInfo::from(&model), &UserUniqueInfo::from(&old_user))?;
    let now = date_time_generator.now_as_iso();
    let user = user_of_update(model, old_user, now);
    repository.update(&user).map_err(UserErr::DB)?;
    let session = session_service.encode(&user, date_time_generator).map_err(UserErr::Session)?;
    Ok(UserUpdateResult { user: user.into(), session })
}

#[cfg(test)]
mod tests {
    use super::{user_of_update, user_update};
    use crate::{
        database::DBErr,
        generator::stub::DateTimeGeneratorStub,
        schedule::user::{
            error::UserErr,
            read::UserIdNotFoundErr,
            stub::{user_after_update_stub, user_stub, user_update_result_stub, user_update_stub, UserRepositoryStub},
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        session::{
            stub::SessionServiceStub, SessionEncodeErr, SessionErr
        },
    };

    #[test]
    fn test_user_of_update() {
        assert_eq!(user_of_update(user_update_stub(), user_stub(), user_stub().updated_at), user_after_update_stub());
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
            Ok(user_update_result_stub())
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

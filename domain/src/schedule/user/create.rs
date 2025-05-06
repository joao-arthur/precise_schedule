use std::{collections::BTreeMap, sync::LazyLock};

use araucaria::validation::{DateValidation, EmailValidation, ObjValidation, StrValidation, Validation};

use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    session::{Session, SessionService},
};

use super::{
    error::UserErr,
    model::User,
    repository::UserRepository,
    unique_info::{UserUniqueInfo, user_create_unique_info_is_valid},
};

#[derive(Debug, PartialEq)]
pub struct UserCreate {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

#[derive(Debug, PartialEq)]
pub struct UserCreateResult {
    pub user: User,
    pub session: Session,
}

pub static USER_CREATE_SCHEMA: LazyLock<Validation> = LazyLock::new(|| {
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

fn user_from_create(model: UserCreate, id: String, created_at: String) -> User {
    User {
        id,
        first_name: model.first_name,
        birthdate: model.birthdate,
        email: model.email,
        username: model.username,
        password: model.password,
        created_at: created_at.clone(),
        updated_at: created_at,
    }
}

pub fn user_create(
    repository: &dyn UserRepository,
    id_generator: &dyn IdGenerator,
    date_time_generator: &dyn DateTimeGenerator,
    session_service: &dyn SessionService,
    model: UserCreate,
) -> Result<UserCreateResult, UserErr> {
    user_create_unique_info_is_valid(repository, &UserUniqueInfo::from(&model))?;
    let id = id_generator.generate();
    let now = date_time_generator.now_as_iso();
    let user = user_from_create(model, id, now);
    repository.create(&user).map_err(UserErr::DB)?;
    let session = session_service.encode(&user, date_time_generator).map_err(UserErr::Session)?;
    Ok(UserCreateResult { user, session })
}

#[cfg(test)]
mod test {
    use super::{UserCreateResult, user_create, user_from_create};
    use crate::{
        database::DBErr,
        generator::stub::{DateTimeGeneratorStub, IdGeneratorStub},
        schedule::user::{
            error::UserErr,
            stub::{UserRepositoryStub, user_after_create_stub, user_create_stub, user_stub},
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        session::{
            SessionEncodeErr, SessionErr,
            stub::{SessionServiceStub, session_stub},
        },
    };

    #[test]
    fn test_user_from_create() {
        assert_eq!(user_from_create(user_create_stub(), user_stub().id, user_stub().created_at), user_after_create_stub());
    }

    #[test]
    fn test_user_create_ok() {
        assert_eq!(
            user_create(
                &UserRepositoryStub::default(),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_create_stub()
            ),
            Ok(UserCreateResult { user: user_after_create_stub(), session: session_stub() })
        );
    }

    #[test]
    fn test_user_create_err() {
        assert_eq!(
            user_create(
                &UserRepositoryStub::of_db_err(),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_create_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_create(
                &UserRepositoryStub::of_unique_info(UserUniqueInfoCount { username: 2, email: 2 }),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_create_stub()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: true }))
        );
        assert_eq!(
            user_create(
                &UserRepositoryStub::default(),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::of_session_err(),
                user_create_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

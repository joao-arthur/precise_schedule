use std::sync::LazyLock;

use araucaria::schema::{DateSchema, EmailSchema, ObjSchema, Schema, StrSchema};

use crate::{
    generator::DateTimeGenerator,
    session::{Session, SessionEncodeService},
};

use super::{
    error::UserErr,
    model::User,
    read::user_read_by_id,
    repository::UserRepository,
    unique_info::{UserUniqueInfo, user_update_unique_info_is_valid},
};

#[derive(Debug, PartialEq)]
pub struct UserUpdateInput {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
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

fn transform_to_user(model: UserUpdateInput, current_user: User, updated_at: String) -> User {
    User {
        first_name: model.first_name,
        birthdate: model.birthdate,
        email: model.email,
        username: model.username,
        password: model.password,
        updated_at,
        ..current_user
    }
}

pub fn user_update(
    repository: &dyn UserRepository,
    date_time_generator: &dyn DateTimeGenerator,
    session_service: &dyn SessionEncodeService,
    id: String,
    model: UserUpdateInput,
) -> Result<Session, UserErr> {
    let old_user = user_read_by_id(repository, &id)?;
    user_update_unique_info_is_valid(repository, &UserUniqueInfo::from(&model), &UserUniqueInfo::from(&old_user))?;
    let now = date_time_generator.now_as_iso();
    let user = transform_to_user(model, old_user, now);
    repository.update(&user).map_err(UserErr::DB)?;
    let session = session_service.encode(&user, date_time_generator).map_err(UserErr::Session)?;
    Ok(session)
}

mod stub {
    use super::UserUpdateInput;

    pub fn user_update_input_stub() -> UserUpdateInput {
        UserUpdateInput {
            email: "john@gmail.com".into(),
            first_name: "John Lennon".into(),
            birthdate: "1940-10-09".into(),
            username: "john_lennon".into(),
            password: "abcd!@#$4321".into(),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        generator::stub::DateTimeGeneratorStub,
        schedule::user::{
            error::UserErr,
            model::{User, stub::user_stub},
            read::UserIdNotFoundErr,
            repository::stub::UserRepositoryStub,
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
            update::UserUpdateInput,
        },
        session::{Session, SessionEncodeErr, SessionErr, stub::SessionEncodeServiceStub},
    };

    use super::{stub::user_update_input_stub, transform_to_user, user_update};

    #[test]
    fn test_transform_to_user() {
        assert_eq!(
            transform_to_user(
                UserUpdateInput {
                    email: "john@gmail.com".into(),
                    first_name: "John Lennon".into(),
                    birthdate: "1940-10-09".into(),
                    username: "john_lennon".into(),
                    password: "abcd!@#$4321".into(),
                },
                User {
                    id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                    email: "paul@gmail.com".into(),
                    first_name: "Paul McCartney".into(),
                    birthdate: "1942-06-18".into(),
                    username: "macca".into(),
                    password: "asdf!@#123".into(),
                    created_at: "2024-03-01T11:26Z".into(),
                    updated_at: "2024-03-01T11:26Z".into(),
                },
                "2025-09-27T18:02Z".into()
            ),
            User {
                id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                email: "john@gmail.com".into(),
                first_name: "John Lennon".into(),
                birthdate: "1940-10-09".into(),
                username: "john_lennon".into(),
                password: "abcd!@#$4321".into(),
                created_at: "2024-03-01T11:26Z".into(),
                updated_at: "2025-09-27T18:02Z".into()
            }
        );
    }

    #[test]
    fn user_update_ok() {
        assert_eq!(
            user_update(
                &UserRepositoryStub::of_user(user_stub()),
                &DateTimeGeneratorStub::of_iso("2025-09-27T18:02Z".into()),
                &SessionEncodeServiceStub::of_token("TENGO SUERTE".into()),
                "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                user_update_input_stub()
            ),
            Ok(Session { token: "TENGO SUERTE".into() })
        );
    }

    #[test]
    fn user_update_err() {
        assert_eq!(
            user_update(
                &UserRepositoryStub::of_db_err(),
                &DateTimeGeneratorStub::of_iso("2025-09-27T18:02Z".into()),
                &SessionEncodeServiceStub::of_token("TENGO SUERTE".into()),
                "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                user_update_input_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_update(
                &UserRepositoryStub::of_none(),
                &DateTimeGeneratorStub::of_iso("2025-09-27T18:02Z".into()),
                &SessionEncodeServiceStub::of_token("TENGO SUERTE".into()),
                "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                user_update_input_stub()
            ),
            Err(UserErr::UserIdNotFound(UserIdNotFoundErr))
        );
        assert_eq!(
            user_update(
                &UserRepositoryStub { err: false, user: Some(user_stub()), user_unique_count: UserUniqueInfoCount { username: 2, email: 2 } },
                &DateTimeGeneratorStub::of_iso("2025-09-27T18:02Z".into()),
                &SessionEncodeServiceStub::of_token("TENGO SUERTE".into()),
                "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                user_update_input_stub()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr { username: true, email: true }))
        );
        assert_eq!(
            user_update(
                &UserRepositoryStub::of_user(user_stub()),
                &DateTimeGeneratorStub::of_iso("2025-09-27T18:02Z".into()),
                &SessionEncodeServiceStub::of_err(),
                "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                user_update_input_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

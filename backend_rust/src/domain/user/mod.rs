use std::boxed::Box;

use crate::domain::database::DB;
use crate::domain::generator::{DateGen, IdGen};

#[derive(Debug, PartialEq)]
pub struct User {
    pub id: String,
    pub first_name: String,
    pub birthdate: String,
    pub email: String,
    pub username: String,
    pub created_at: String,
    pub password: String,
    pub updated_at: String,
}

pub struct UserCreateModel {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

fn user_from_create_model(user: UserCreateModel, id: String, created_at: String) -> User {
    User {
        id,
        first_name: user.first_name,
        birthdate: user.birthdate,
        email: user.email,
        username: user.username,
        password: user.password,
        created_at: created_at.clone(),
        updated_at: created_at,
    }
}

#[derive(PartialEq, Debug)]
pub struct UserCreateError;

pub trait UserCreateService {
    fn create(&self, user_create_model: UserCreateModel) -> Result<User, UserCreateError>;
}

fn user_create(
    id_gen: &dyn IdGen,
    date_gen: &dyn DateGen,
    user_create_model: UserCreateModel,
) -> Result<User, UserCreateError> {
    let id = id_gen.gen();
    let date = date_gen.gen();
    let user = user_from_create_model(user_create_model, id, date);
    Ok(user)
}

struct UserCreateServiceImpl {
    id_gen: Box<dyn IdGen>,
    date_gen: Box<dyn DateGen>,
}

impl UserCreateService for UserCreateServiceImpl {
    fn create(&self, user_create_model: UserCreateModel) -> Result<User, UserCreateError> {
        user_create(self.id_gen.as_ref(), self.date_gen.as_ref(), user_create_model)
    }
}

#[cfg(test)]
mod user_create_test {
    use super::*;
    use crate::domain::generator::{IdGenStub, DateGenStub};

    #[test]
    fn test_user_from_create_model() {
        let user_create_model = UserCreateModel {
            email: "email".to_owned(),
            first_name: "first_name".to_owned(),
            birthdate: "birthdate".to_owned(),
            username: "username".to_owned(),
            password: "password".to_owned(),
        };
        let user = User {
            id: "user_id".to_owned(),
            email: "email".to_owned(),
            first_name: "first_name".to_owned(),
            birthdate: "birthdate".to_owned(),
            username: "username".to_owned(),
            password: "password".to_owned(),
            created_at: "2024-07-03T22:49:51.279Z".to_owned(),
            updated_at: "2024-07-03T22:49:51.279Z".to_owned(),
        };
        assert_eq!(
            user_from_create_model(
                user_create_model,
                "user_id".to_owned(),
                "2024-07-03T22:49:51.279Z".to_owned()
            ),
            user
        );
    }

    #[test]
    fn test_user_create() {
        let user_create_model = UserCreateModel {
            email: "email".to_owned(),
            first_name: "first_name".to_owned(),
            birthdate: "birthdate".to_owned(),
            username: "username".to_owned(),
            password: "password".to_owned(),
        };
        let user = User {
            id: "user_id".to_owned(),
            email: "email".to_owned(),
            first_name: "first_name".to_owned(),
            birthdate: "birthdate".to_owned(),
            username: "username".to_owned(),
            password: "password".to_owned(),
            created_at: "2024-07-03T22:49:51.279Z".to_owned(),
            updated_at: "2024-07-03T22:49:51.279Z".to_owned(),
        };
        assert_eq!(
            user_create(
                Box::new(IdGenStub("user_id".to_owned())),
                Box::new(DateGenStub("2024-07-03T22:49:51.279Z".to_owned())),
                user_create_model
            ),
            Ok(user)
        );
    }
}

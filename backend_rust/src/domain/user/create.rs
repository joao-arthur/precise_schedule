use crate::domain::generator::{DateGen, IdGen};

use super::{User, UserRepo};

pub struct UserCreateModel {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

pub trait UserCreateRepo {}

#[derive(PartialEq, Debug)]
pub struct UserCreateErr;

pub trait UserCreateService {
    fn create(&self, user_create_model: UserCreateModel) -> Result<User, UserCreateErr>;
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

fn user_create(
    repo: &dyn UserRepo,
    id_gen: &dyn IdGen,
    date_gen: &dyn DateGen,
    user_create_model: UserCreateModel,
) -> Result<User, UserCreateErr> {
    let id = id_gen.gen();
    let date = date_gen.gen();
    let user = user_from_create_model(user_create_model, id, date);
    repo.c(&user).map_err(|_| UserCreateErr {})?;
    Ok(user)
}

pub struct UserCreateServiceImpl<'a> {
    repo: &'a dyn UserRepo,
    id_gen: &'a dyn IdGen,
    date_gen: &'a dyn DateGen,
}

impl UserCreateService for UserCreateServiceImpl<'_> {
    fn create(&self, user_create_model: UserCreateModel) -> Result<User, UserCreateErr> {
        user_create(self.repo, self.id_gen, self.date_gen, user_create_model)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::generator::test::{DateGenStub, IdGenStub};

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
                &Db & IdGenStub("user_id".to_owned()),
                &DateGenStub("2024-07-03T22:49:51.279Z".to_owned()),
                user_create_model
            ),
            Ok(user)
        );
    }
}

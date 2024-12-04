use super::User;
use crate::domain::database::DBErr;
use crate::domain::generator::{DateGen, IdGen};

pub struct UserUModel {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

pub trait UserURepo {
    fn u(&self, user: &User) -> Result<(), DBErr>;
}

#[derive(PartialEq, Debug)]
pub enum UserUErr {
    DBErr(DBErr),
}

pub trait UserUService {
    fn u(&self, model: UserUModel) -> Result<User, UserUErr>;
}

fn user_from_u(model: UserUModel, user: User, updated_at: String) -> User {
    User {
        id: user.id,
        first_name: model.first_name,
        birthdate: model.birthdate,
        email: model.email,
        username: model.username,
        password: model.password,
        created_at: user.created_at,
        updated_at,
    }
}

fn user_u(
    repo: &dyn UserURepo,
    id_gen: &dyn IdGen,
    date_gen: &dyn DateGen,
    model: UserUModel,
) -> Result<User, UserUErr> {
    let date = date_gen.gen();
    let user = user_from_u(model, id, date);
    repo.u(&user).map_err(|e| UserUErr::DBErr(e))?;
    Ok(user)
}

pub struct UserUServiceImpl<'a> {
    repo: &'a dyn UserURepo,
    id_gen: &'a dyn IdGen,
    date_gen: &'a dyn DateGen,
}

impl UserUService for UserUServiceImpl<'_> {
    fn u(&self, user_create_model: UserUModel) -> Result<User, UserUErr> {
        user_u(self.repo, self.id_gen, self.date_gen, user_create_model)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::generator::test::{DateGenStub, IdGenStub};

    pub struct UserCRepoStub(Result<(), DBErr>);

    impl UserURepo for UserCRepoStub {
        fn u(&self, _: &User) -> Result<(), DBErr> {
            self.0.clone()
        }
    }

    #[test]
    fn test_user_from_c() {
        let user_u_model = UserUModel {
            email: String::from("email"),
            first_name: String::from("first_name"),
            birthdate: String::from("birthdate"),
            username: String::from("username"),
            password: String::from("password"),
        };
        let user = User {
            id: String::from("user_id"),
            email: String::from("email"),
            first_name: String::from("first_name"),
            birthdate: String::from("birthdate"),
            username: String::from("username"),
            password: String::from("password"),
            created_at: String::from("2024-07-03T22:49:51.279Z"),
            updated_at: String::from("2024-07-03T22:49:51.279Z"),
        };
        assert_eq!(
            user_from_u(user_u_model, String::from("user_id"), String::from("2024-07-03T22:49:51.279Z")),
            user
        );
    }

    #[test]
    fn test_user_create() {
        let user_u_model = UserUModel {
            email: String::from("email"),
            first_name: String::from("first_name"),
            birthdate: String::from("birthdate"),
            username: String::from("username"),
            password: String::from("password"),
        };
        let user = User {
            id: String::from("user_id"),
            email: String::from("email"),
            first_name: String::from("first_name"),
            birthdate: String::from("birthdate"),
            username: String::from("username"),
            password: String::from("password"),
            created_at: String::from("2024-07-03T22:49:51.279Z"),
            updated_at: String::from("2024-07-03T22:49:51.279Z"),
        };
        assert_eq!(
            user_u(
                &UserCRepoStub(Ok(())),
                &IdGenStub(String::from("user_id")),
                &DateGenStub(String::from("2024-07-03T22:49:51.279Z")),
                user_u_model
            ),
            Ok(user)
        );
    }
}

use super::User;
use crate::domain::database::DBErr;
use crate::domain::generator::{DateGen, IdGen};

pub struct UserCModel {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

pub trait UserCRepo {
    fn c(&self, user: &User) -> Result<(), DBErr>;
}

#[derive(PartialEq, Debug)]
pub enum UserCErr {
    DBErr(DBErr),
}

pub trait UserCService {
    fn c(&self, model: UserCModel) -> Result<User, UserCErr>;
}

fn user_from_c(model: UserCModel, id: String, created_at: String) -> User {
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

fn user_c(
    repo: &dyn UserCRepo,
    id_gen: &dyn IdGen,
    date_gen: &dyn DateGen,
    model: UserCModel,
) -> Result<User, UserCErr> {
    let id = id_gen.gen();
    let date = date_gen.gen();
    let user = user_from_c(model, id, date);
    repo.c(&user).map_err(|e| UserCErr::DBErr(e))?;
    Ok(user)
}

pub struct UserCServiceImpl<'a> {
    repo: &'a dyn UserCRepo,
    id_gen: &'a dyn IdGen,
    date_gen: &'a dyn DateGen,
}

impl UserCService for UserCServiceImpl<'_> {
    fn c(&self, user_create_model: UserCModel) -> Result<User, UserCErr> {
        user_c(self.repo, self.id_gen, self.date_gen, user_create_model)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::generator::test::{DateGenStub, IdGenStub};

    pub struct UserCRepoStub(Result<(), DBErr>);

    impl UserCRepo for UserCRepoStub {
        fn c(&self, _: &User) -> Result<(), DBErr> {
            self.0.clone()
        }
    }

    #[test]
    fn test_user_from_c() {
        let user_c_model = UserCModel {
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
            user_from_c(
                user_c_model,
                "user_id".to_owned(),
                "2024-07-03T22:49:51.279Z".to_owned()
            ),
            user
        );
    }

    #[test]
    fn test_user_create() {
        let user_c_model = UserCModel {
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
            user_c(
                &UserCRepoStub(Ok(())),
                &IdGenStub("user_id".to_owned()),
                &DateGenStub("2024-07-03T22:49:51.279Z".to_owned()),
                user_c_model
            ),
            Ok(user)
        );
    }
}

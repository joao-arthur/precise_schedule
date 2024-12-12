use std::{collections::HashMap, sync::LazyLock};

use crate::domain::{
    database::DBErr,
    generator::{DateGen, IdGen},
    schedule::user::User,
    validation::{Schema, Validation, Value},
};

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

static USER_C_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    HashMap::from([
        (
            "first_name",
            vec![
                Validation::Required,
                Validation::Str,
                Validation::StrMinLen(1),
                Validation::StrMaxLen(256),
            ],
        ),
        (
            "birthdate",
            vec![
                Validation::Required,
                Validation::Str,
                Validation::Dt,
                Validation::DtMin(String::from("1970-01-01")),
            ],
        ),
        ("email", vec![Validation::Required, Validation::Str, Validation::Email]),
        (
            "username",
            vec![
                Validation::Required,
                Validation::Str,
                Validation::StrMinLen(1),
                Validation::StrMaxLen(32),
            ],
        ),
        (
            "password",
            vec![
                Validation::Required,
                Validation::Str,
                Validation::StrMinLen(1),
                Validation::StrMaxLen(32),
                Validation::StrMinUpper(1),
                Validation::StrMinLower(1),
                Validation::StrMinSpecial(1),
                Validation::StrMinNum(1),
            ],
        ),
    ])
});

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
    let input_value = HashMap::from([
        ("first_name", Value::Str(model.first_name.clone())),
        ("birthdate", Value::Str(model.birthdate.clone())),
        ("email", Value::Str(model.email.clone())),
        ("username", Value::Str(model.username.clone())),
        ("password", Value::Str(model.password.clone())),
    ]);
    //validate(schema, input_value);

    let id = id_gen.gen();
    let date = date_gen.gen();
    let user = user_from_c(model, id, date);
    repo.c(&user).map_err(|e| UserCErr::DBErr(e))?;
    Ok(user)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::{
        generator::test::{DateGenStub, IdGenStub},
        schedule::user::test::user_stub,
    };

    pub struct UserCRepoStub(Result<(), DBErr>);

    impl UserCRepo for UserCRepoStub {
        fn c(&self, _: &User) -> Result<(), DBErr> {
            self.0.clone()
        }
    }

    pub fn user_c_stub() -> UserCModel {
        UserCModel {
            email: String::from("paul@gmail.com"),
            first_name: String::from("Paul McCartney"),
            birthdate: String::from("1942-06-18"),
            username: String::from("paul_mc"),
            password: String::from("asdf!@#123"),
        }
    }

    #[test]
    fn test_user_from_c() {
        let user = User {
            created_at: String::from("2024-07-03T22:49:51.279Z"),
            updated_at: String::from("2024-07-03T22:49:51.279Z"),
            ..user_stub()
        };
        assert_eq!(
            user_from_c(
                user_c_stub(),
                String::from("a6edc906-2f9f-5fb2-a373-efac406f0ef2"),
                String::from("2024-07-03T22:49:51.279Z")
            ),
            user
        );
    }

    #[test]
    fn test_user_c() {
        let user = User {
            created_at: String::from("2024-07-03T22:49:51.279Z"),
            updated_at: String::from("2024-07-03T22:49:51.279Z"),
            ..user_stub()
        };
        assert_eq!(
            user_c(
                &UserCRepoStub(Ok(())),
                &IdGenStub(String::from("a6edc906-2f9f-5fb2-a373-efac406f0ef2")),
                &DateGenStub(String::from("2024-07-03T22:49:51.279Z")),
                user_c_stub()
            ),
            Ok(user)
        );
    }

    #[test]
    fn test_user_c_db_err() {
        assert_eq!(
            user_c(
                &UserCRepoStub(Err(DBErr)),
                &IdGenStub(String::from("a6edc906-2f9f-5fb2-a373-efac406f0ef2")),
                &DateGenStub(String::from("2024-07-03T22:49:51.279Z")),
                user_c_stub()
            ),
            Err(UserCErr::DBErr(DBErr))
        );
    }
}

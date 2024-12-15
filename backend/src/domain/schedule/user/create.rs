use std::{collections::HashMap, sync::LazyLock};

use crate::domain::{
    generator::{DateGen, IdGen},
    schedule::user::{
        error::UserErr,
        model::User,
        repo::UserRepo,
        unique_info::{user_c_unique_info_is_valid, UserUniqueInfo},
    },
    validation::{Schema, Validator, Value, V},
};

pub struct UserCModel {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

static USER_C_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    HashMap::from([
        ("first_name", vec![V::Required, V::Str, V::StrMinLen(1), V::StrMaxLen(256)]),
        ("birthdate", vec![V::Required, V::Str, V::Dt, V::DtMin(String::from("1970-01-01"))]),
        ("email", vec![V::Required, V::Str, V::Email]),
        ("username", vec![V::Required, V::Str, V::StrMinLen(1), V::StrMaxLen(32)]),
        (
            "password",
            vec![
                V::Required,
                V::Str,
                V::StrMinLen(1),
                V::StrMaxLen(32),
                V::StrMinUpper(1),
                V::StrMinLower(1),
                V::StrMinSpecial(1),
                V::StrMinNum(1),
            ],
        ),
    ])
});

fn user_c(
    validator: &dyn Validator,
    repo: &dyn UserRepo,
    id_gen: &dyn IdGen,
    date_gen: &dyn DateGen,
    model: UserCModel,
) -> Result<User, UserErr> {
    let input_value = Value::Obj(HashMap::from([
        (String::from("first_name"), Value::Str(model.first_name.clone())),
        (String::from("birthdate"), Value::Str(model.birthdate.clone())),
        (String::from("email"), Value::Str(model.email.clone())),
        (String::from("username"), Value::Str(model.username.clone())),
        (String::from("password"), Value::Str(model.password.clone())),
    ]));
    validator.validate(&USER_C_SCHEMA, &input_value).map_err(UserErr::SchemaErr)?;
    user_c_unique_info_is_valid(repo, &UserUniqueInfo::from(&model))?;
    let id = id_gen.gen();
    let now = date_gen.gen();
    let user = User {
        id,
        first_name: model.first_name,
        birthdate: model.birthdate,
        email: model.email,
        username: model.username,
        password: model.password,
        created_at: now.clone(),
        updated_at: now,
    };
    repo.c(&user).map_err(UserErr::DBErr)?;
    Ok(user)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::{
        database::DBErr,
        generator::test::{DateGenStub, IdGenStub},
        schedule::user::{
            stub::{user_after_c_stub, user_c_stub, user_stub, UserRepoStub},
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        validation::{test::ValidatorStub, VErr},
    };

    #[test]
    fn test_user_c_ok() {
        assert_eq!(
            user_c(
                &ValidatorStub(Ok(())),
                &UserRepoStub::default(),
                &IdGenStub(user_stub().id),
                &DateGenStub(user_stub().created_at),
                user_c_stub()
            ),
            Ok(user_after_c_stub())
        );
    }

    #[test]
    fn test_user_c_err() {
        assert_eq!(
            user_c(
                &ValidatorStub(Ok(())),
                &UserRepoStub::of_db_err(),
                &IdGenStub(user_stub().id),
                &DateGenStub(user_stub().created_at),
                user_c_stub()
            ),
            Err(UserErr::DBErr(DBErr))
        );
        assert_eq!(
            user_c(
                &ValidatorStub(Err(HashMap::from([(
                    String::from("first_name"),
                    vec![VErr::RequiredErr]
                )]))),
                &UserRepoStub::default(),
                &IdGenStub(user_stub().id),
                &DateGenStub(user_stub().created_at),
                user_c_stub()
            ),
            Err(UserErr::SchemaErr(HashMap::from([(
                String::from("first_name"),
                vec![VErr::RequiredErr]
            )])))
        );
        assert_eq!(
            user_c(
                &ValidatorStub(Ok(())),
                &UserRepoStub::of_2(UserUniqueInfoCount { username: 2, email: 2 }),
                &IdGenStub(user_stub().id),
                &DateGenStub(user_stub().created_at),
                user_c_stub()
            ),
            Err(UserErr::UserUniqueInfoFieldErr(UserUniqueInfoFieldErr {
                username: true,
                email: true
            }))
        );
    }
}

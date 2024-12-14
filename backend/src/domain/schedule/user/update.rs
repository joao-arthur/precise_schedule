use std::{collections::HashMap, sync::LazyLock};

use crate::domain::{
    generator::DateGen,
    schedule::user::{
        error::UserErr,
        model::User,
        read_by_id::user_r_by_id,
        repo::UserRepo,
        unique_info::{user_u_unique_info_is_valid, UserUniqueInfo},
    },
    validation::{Schema, Validator, Value, V},
};

pub struct UserUModel {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

static USER_U_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
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
    validator: &dyn Validator,
    repo: &dyn UserRepo,
    date_gen: &dyn DateGen,
    id: String,
    model: UserUModel,
) -> Result<User, UserErr> {
    let input_value = Value::Obj(HashMap::from([
        (String::from("first_name"), Value::Str(model.first_name.clone())),
        (String::from("birthdate"), Value::Str(model.birthdate.clone())),
        (String::from("email"), Value::Str(model.email.clone())),
        (String::from("username"), Value::Str(model.username.clone())),
        (String::from("password"), Value::Str(model.password.clone())),
    ]));
    validator.validate(&USER_U_SCHEMA, &input_value).map_err(UserErr::SchemaErr)?;
    let old_user = user_r_by_id(repo, &id)?;
    user_u_unique_info_is_valid(
        repo,
        &UserUniqueInfo { username: model.username.clone(), email: model.email.clone() },
        &UserUniqueInfo { username: old_user.username.clone(), email: old_user.email.clone() },
    )?;
    let date = date_gen.gen();
    let user = user_from_u(model, old_user, date);
    repo.u(&user).map_err(UserErr::DBErr)?;
    Ok(user)
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::{
        database::DBErr,
        generator::test::DateGenStub,
        schedule::user::stub::{user_after_u_stub, user_stub, user_u_stub, UserRepoStub},
        validation::{test::ValidatorStub, VErr},
    };

    #[test]
    fn test_user_from_c() {
        assert_eq!(
            user_from_u(user_u_stub(), user_stub(), user_stub().updated_at),
            user_after_u_stub()
        );
    }

    #[test]
    fn test_user_u_ok() {
        assert_eq!(
            user_u(
                &ValidatorStub(Ok(())),
                &UserRepoStub::default(),
                &DateGenStub(user_stub().updated_at),
                user_stub().id,
                user_u_stub()
            ),
            Ok(user_after_u_stub())
        );
    }

    #[test]
    fn test_user_u_err() {
        assert_eq!(
            user_u(
                &ValidatorStub(Ok(())),
                &UserRepoStub::of_db_err(),
                &DateGenStub(user_stub().updated_at),
                user_stub().id,
                user_u_stub()
            ),
            Err(UserErr::DBErr(DBErr))
        );
        assert_eq!(
            user_u(
                &ValidatorStub(Err(HashMap::from([(
                    String::from("first_name"),
                    vec![VErr::RequiredErr]
                )]))),
                &UserRepoStub::default(),
                &DateGenStub(user_stub().updated_at),
                user_stub().id,
                user_u_stub()
            ),
            Err(UserErr::SchemaErr(HashMap::from([(
                String::from("first_name"),
                vec![VErr::RequiredErr]
            )])))
        );
    }
}

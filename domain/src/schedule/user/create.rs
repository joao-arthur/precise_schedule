use std::{collections::HashMap, sync::LazyLock};

use araucaria::validation::{date::DateValidation, email::EmailValidation, str::StrValidation, ObjValidation, Validation};

use crate::{
    generator::{DateTimeGen, IdGen},
    session::{Session, SessionService}, validation::Validator,
};

use super::{
    error::UserErr,
    model::User,
    repo::UserRepo,
    unique_info::{user_c_unique_info_is_valid, UserUniqueInfo},
};

#[derive(Debug, PartialEq)]
pub struct UserC {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

#[derive(Debug, PartialEq)]
pub struct UserCResult {
    pub user: User,
    pub session: Session,
}

pub static USER_C_SCHEMA: LazyLock<Validation> = LazyLock::new(|| {
    Validation::Obj(ObjValidation {
        validation: HashMap::from([
            (
                "first_name",
                Validation::Str(StrValidation::default().required().min_graphemes_len(1).max_graphemes_len(256))
            ),
            (
                "birthdate",
                Validation::Date(DateValidation::default().required().ge(String::from("1970-01-01")))
            ),
            ("email", Validation::Email(EmailValidation::default().required())),
            (
                "username",
                Validation::Str(StrValidation::default().required().min_graphemes_len(1).max_graphemes_len(64))
            ),
            (
                "password",
                Validation::Str(StrValidation::default()
                    .required()
                    .min_graphemes_len(1)
                    .max_graphemes_len(64)
                    .min_uppercase_len(1)
                    .min_lowercase_len(1)
                    .min_number_len(1)
                    .min_symbols_len(1)
                ),
            ),
        ]),
        required: true
    })
});

fn user_from_c(user_c: UserC, id: String, created_at: String) -> User {
    User {
        id,
        first_name: user_c.first_name,
        birthdate: user_c.birthdate,
        email: user_c.email,
        username: user_c.username,
        password: user_c.password,
        created_at: created_at.clone(),
        updated_at: created_at,
    }
}

pub fn user_c(
    validator: &dyn Validator,
    repo: &dyn UserRepo,
    id_gen: &dyn IdGen,
    date_time_gen: &dyn DateTimeGen,
    session_service: &dyn SessionService,
    user_c: UserC,
) -> Result<UserCResult, UserErr> {
    let input_value = Val::Obj(HashMap::from([
        (String::from("first_name"), Val::Str(user_c.first_name.clone())),
        (String::from("birthdate"), Val::Str(user_c.birthdate.clone())),
        (String::from("email"), Val::Str(user_c.email.clone())),
        (String::from("username"), Val::Str(user_c.username.clone())),
        (String::from("password"), Val::Str(user_c.password.clone())),
    ]));
    validator.validate(&USER_C_SCHEMA, &input_value).map_err(UserErr::Schema)?;
    user_c_unique_info_is_valid(repo, &UserUniqueInfo::from(&user_c))?;
    let id = id_gen.gen();
    let now = date_time_gen.now_as_iso();
    let user = user_from_c(user_c, id, now);
    repo.c(&user).map_err(UserErr::DB)?;
    let session = session_service.encode(&user, date_time_gen).map_err(UserErr::Session)?;
    Ok(UserCResult { user, session })
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::{
        database::DBErr,
        generator::stub::{DateTimeGenStub, IdGenStub},
        schedule::user::{
            stub::{user_after_c_stub, user_c_stub, user_stub, UserRepoStub},
            unique_info::{UserUniqueInfoCount, UserUniqueInfoFieldErr},
        },
        session::{
            stub::{session_stub, SessionServiceStub},
            SessionEncodeErr, SessionErr,
        },
        validation::stub::ValidatorStub,
    };

    #[test]
    fn test_user_from_c() {
        assert_eq!(
            user_from_c(user_c_stub(), user_stub().id, user_stub().created_at),
            user_after_c_stub()
        );
    }

    #[test]
    fn test_user_c_ok() {
        assert_eq!(
            user_c(
                &ValidatorStub(Ok(())),
                &UserRepoStub::default(),
                &IdGenStub(user_stub().id),
                &DateTimeGenStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_c_stub()
            ),
            Ok(UserCResult { user: user_after_c_stub(), session: session_stub() })
        );
    }

    #[test]
    fn test_user_c_err() {
        assert_eq!(
            user_c(
                &ValidatorStub(Ok(())),
                &UserRepoStub::of_db_err(),
                &IdGenStub(user_stub().id),
                &DateTimeGenStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_c_stub()
            ),
            Err(UserErr::DB(DBErr))
        );
        assert_eq!(
            user_c(
                &ValidatorStub(Err(HashMap::from([("first_name", vec![V::Required])]))),
                &UserRepoStub::default(),
                &IdGenStub(user_stub().id),
                &DateTimeGenStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_c_stub()
            ),
            Err(UserErr::Schema(HashMap::from([("first_name", vec![V::Required])])))
        );
        assert_eq!(
            user_c(
                &ValidatorStub(Ok(())),
                &UserRepoStub::of_unique_info(UserUniqueInfoCount { username: 2, email: 2 }),
                &IdGenStub(user_stub().id),
                &DateTimeGenStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::default(),
                user_c_stub()
            ),
            Err(UserErr::UserUniqueInfoField(UserUniqueInfoFieldErr {
                username: true,
                email: true
            }))
        );
        assert_eq!(
            user_c(
                &ValidatorStub(Ok(())),
                &UserRepoStub::default(),
                &IdGenStub(user_stub().id),
                &DateTimeGenStub(user_stub().created_at, 1734555761),
                &SessionServiceStub::of_session_err(),
                user_c_stub()
            ),
            Err(UserErr::Session(SessionErr::Encode(SessionEncodeErr)))
        );
    }
}

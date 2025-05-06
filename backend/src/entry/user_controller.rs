
use domain::schedule::user::{create::{user_create, UserCreate, USER_CREATE_SCHEMA}, update::UserUpdate};
use rocket::{
    data::ToByteUnit,
    Data,
    response::status::Custom,
    serde::json::Json,
    http::Status,
    post,
    response::status
};
use serde_json::Value;
use serde::{Deserialize, Deserializer, Serialize};

use crate::{
    LanguageGuard,
    entry::deps::{get_date_time_gen, get_id_gen, get_session_service, get_user_repo},
    infra::validation::language_to_locale,
};

#[derive(Debug, PartialEq, Clone, Serialize, Deserialize)]
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

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct UserCResult {
    pub user: User,
    pub session: Session,
}

#[derive(Debug, PartialEq, Clone, Serialize, Deserialize)]
pub struct Session {
    pub token: String,
}

#[derive(Debug, PartialEq, Clone, Serialize, Deserialize)]
struct ErrorGeneric {
    error: String,
}


#[derive(Deserialize)]
#[serde(remote = "UserCreate")]
struct UserCreateProxy {
    pub email: String,
    pub first_name: String,
    pub birthdate: String,
    pub username: String,
    pub password: String,
}

pub struct UserCreateWrapper(pub UserCreate);

impl<'de> Deserialize<'de> for UserCreateWrapper {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        UserCreateProxy::deserialize(deserializer).map(UserCreateWrapper)
    }
}

#[post("/", format = "application/json", data = "<data>")]
pub async fn endpoint_user_create(data: Data<'_>, lg: LanguageGuard) -> Result<Json<UserCResult>, Custom<String>> {
    let limit = 1.kilobytes();
    let body = match data.open(limit).into_bytes().await {
        Ok(body) => {
            if body.len() >= limit {
                return Err(status::Custom(
                    Status::PayloadTooLarge,
                    serde_json::to_string(&ErrorGeneric { error: "The payload is too large".to_owned() }).unwrap(),
                ));
            }
            body.value
        }
        Err(_) => {
            return Err(status::Custom(
                Status::PayloadTooLarge,
                serde_json::to_string(&ErrorGeneric { error: "The payload is too large".to_owned() }).unwrap(),
            ));
        }
    };
    let json_value: Value = serde_json::from_slice(&body).unwrap();

    let result = araucaria_plugins::deserialize::deserialize_from_json::<UserCreateWrapper>(json_value, &USER_CREATE_SCHEMA, &language_to_locale(&lg.0));
    if let Err(err) = result {
        return Err(status::Custom(Status::UnprocessableEntity, err));
    }
    let user_erf = result.unwrap().0;
    let user = UserCreate {
        email: user_erf.email.to_string(),
        first_name: user_erf.first_name.to_string(),
        birthdate: user_erf.birthdate.to_string(),
        username: user_erf.username.to_string(),
        password: user_erf.password.to_string(),
    };
    let repo = get_user_repo();
    let temp = user_create(repo, get_id_gen(), get_date_time_gen(), get_session_service(), user).unwrap();
    return Ok(Json(UserCResult {
        user: User {
            id: temp.user.id.clone(),
            first_name: temp.user.first_name.clone(),
            birthdate: temp.user.birthdate.clone(),
            email: temp.user.email.clone(),
            username: temp.user.username.clone(),
            created_at: temp.user.created_at.clone(),
            password: temp.user.password.clone(),
            updated_at: temp.user.updated_at.clone(),
        },
        session: Session { token: temp.session.token },
    }));
    //    let erri18n: HashMap<&str, Vec<String>> = err
    //        .into_iter()
    //        .map(|f| {
    //            (f.0, f.1.iter().map(|p| validation_i18n(p, &lg.0)).collect::<Vec<String>>())
    //        })
    //        .collect();
    //    return Err(status::Custom(
    //        Status::UnprocessableEntity,
    //        serde_json::to_string(&erri18n).unwrap(),
    //    ));
}

#[put("/", format = "application/json")]
pub fn endpoint_user_update() {}

#[get("/", format = "application/json")]
pub fn endpoint_user_read() {}

#[post("/login", format = "application/json")]
pub fn endpoint_user_login() {}

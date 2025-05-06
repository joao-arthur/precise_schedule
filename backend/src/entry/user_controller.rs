
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
    entry::deps::{get_date_time_gen, get_id_gen, get_session_service, get_user_repository},
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

#[derive(Debug, PartialEq, Serialize)]
pub struct UserCreateResult {
    pub user: User,
    pub session: Session,
}

#[derive(Debug, PartialEq, Clone, Serialize)]
pub struct Session {
    pub token: String,
}

#[derive(Debug, PartialEq, Clone, Serialize)]
struct ErrorGeneric {
    error: String,
}

#[post("/", format = "application/json", data = "<data>")]
pub async fn endpoint_user_create(data: Data<'_>, lg: LanguageGuard) -> Result<Json<UserCreateResult>, Custom<String>> {
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
        return Err(status::Custom(Status::UnprocessableEntity, serde_json::to_string(&err).unwrap()));
    }
    let user = result.unwrap().0;
    let repository = get_user_repository();
    let temp = user_create(repository, get_id_gen(), get_date_time_gen(), get_session_service(), user).unwrap();
    return Ok(Json(UserCreateResult {
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
}

#[put("/", format = "application/json")]
pub fn endpoint_user_update() {}

#[get("/", format = "application/json")]
pub fn endpoint_user_read() {}

#[post("/login", format = "application/json")]
pub fn endpoint_user_login() {}

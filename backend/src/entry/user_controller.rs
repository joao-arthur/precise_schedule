use domain::{
    schedule::user::{
        create::{USER_CREATE_SCHEMA, UserCreate, user_create},
        error::UserErr,
        update::UserUpdate,
    },
    session::SessionErr,
};
use rocket::{Data, data::ToByteUnit, http::Status, post, response::status, response::status::Custom, serde::json::Json};
use serde::{Deserialize, Deserializer, Serialize};
use serde_json::Value;

use crate::{
    LanguageGuard,
    entry::deps::{get_date_time_gen, get_id_gen, get_session_service, get_user_repository},
    infra::validation::language_to_locale,
};

#[derive(Debug, PartialEq, Clone, Serialize)]
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
                    serde_json::to_string(&ErrorGeneric { error: "The payload is too large".to_string() }).unwrap(),
                ));
            }
            body.value
        }
        Err(_) => {
            return Err(status::Custom(
                Status::PayloadTooLarge,
                serde_json::to_string(&ErrorGeneric { error: "The payload is too large".to_string() }).unwrap(),
            ));
        }
    };
    let json_value: Value = serde_json::from_slice(&body).unwrap();
    let result_deserialize =
        araucaria_plugins::deserialize::deserialize_from_json::<UserCreateWrapper>(json_value, &USER_CREATE_SCHEMA, &language_to_locale(&lg.0));

    if let Err(err) = result_deserialize {
        return Err(status::Custom(Status::UnprocessableEntity, serde_json::to_string(&err).unwrap()));
    }
    let user = result_deserialize.unwrap().0;
    let repository = get_user_repository();
    let result_create = user_create(repository, get_id_gen(), get_date_time_gen(), get_session_service(), user);
    if let Err(err) = result_create {
        match err {
            UserErr::DB(db_err) => {
                return Err(status::Custom(
                    Status::ServiceUnavailable,
                    serde_json::to_string(&ErrorGeneric { error: "There was an error with the dabatase.".to_string() }).unwrap(),
                ));
            }
            UserErr::Schema(schema_err) => {
                return Err(status::Custom(Status::InternalServerError, serde_json::to_string(&ErrorGeneric { error: "".to_string() }).unwrap()));
            }
            UserErr::UserUniqueInfoField(user_unique_info_field_err) => {
                let message = if user_unique_info_field_err.email && user_unique_info_field_err.username {
                    "There is already an user with this email and username.".to_string()
                } else if user_unique_info_field_err.email {
                    "There is already an user with this email.".to_string()
                } else {
                    "There is already an user with this username.".to_string()
                };
                return Err(status::Custom(Status::UnprocessableEntity, serde_json::to_string(&ErrorGeneric { error: message }).unwrap()));
            }
            UserErr::UserIdNotFound(_) => {
                return Err(status::Custom(
                    Status::NotFound,
                    serde_json::to_string(&ErrorGeneric { error: "The user was not found.".to_string() }).unwrap(),
                ));
            }
            UserErr::UserCredentialsNotFound(_) => {
                return Err(status::Custom(
                    Status::Unauthorized,
                    serde_json::to_string(&ErrorGeneric { error: "Wrong username or password.".to_string() }).unwrap(),
                ));
            }
            UserErr::Session(session_err) => match session_err {
                SessionErr::Encode(_) => {
                    return Err(status::Custom(
                        Status::InternalServerError,
                        serde_json::to_string(&ErrorGeneric { error: "It was not possible to create your session.".to_string() }).unwrap(),
                    ));
                }
                SessionErr::Decode(_) => {
                    return Err(status::Custom(
                        Status::Unauthorized,
                        serde_json::to_string(&ErrorGeneric { error: "Your session is invalid.".to_string() }).unwrap(),
                    ));
                }
            },
        }
    }
    let result = result_create.unwrap();
    return Ok(Json(UserCreateResult {
        user: User {
            id: result.user.id.clone(),
            first_name: result.user.first_name.clone(),
            birthdate: result.user.birthdate.clone(),
            email: result.user.email.clone(),
            username: result.user.username.clone(),
            created_at: result.user.created_at.clone(),
            password: result.user.password.clone(),
            updated_at: result.user.updated_at.clone(),
        },
        session: Session { token: result.session.token },
    }));
}

#[put("/", format = "application/json")]
pub fn endpoint_user_update() {}

#[get("/", format = "application/json")]
pub fn endpoint_user_read() {}

#[post("/login", format = "application/json")]
pub fn endpoint_user_login() {}

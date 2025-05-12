use domain::{
    schedule::user::{
        error::UserErr,
        sign_up::{user_sign_up, UserSignUpInput, USER_SIGN_UP_SCHEMA},
    },
    session::{Session, SessionErr},
};
use rocket::{Data, data::ToByteUnit, http::Status, post, response::status, response::status::Custom, serde::json::Json};
use serde::{Deserialize, Deserializer, Serialize};
use serde_json::Value;

use crate::{
    LanguageGuard,
    entry::deps::{get_date_time_generator, get_id_generator, get_user_repository},
    infra::validation::language_to_locale,
};

use super::deps::get_encode_session_service;

#[derive(Deserialize)]
#[serde(remote = "UserSignUpInput")]
struct UserSignUpInputProxy {
    email: String,
    first_name: String,
    birthdate: String,
    username: String,
    password: String,
}

struct UserSignUpWrapper(pub UserSignUpInput);

impl<'de> Deserialize<'de> for UserSignUpWrapper {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        UserSignUpInputProxy::deserialize(deserializer).map(UserSignUpWrapper)
    }
}

#[derive(Debug, PartialEq, Clone, Serialize)]
struct SessionProxy {
    token: String,
}

impl From<Session> for SessionProxy {
    fn from(value: Session) -> Self {
        SessionProxy { token: value.token }
    }
}

#[derive(Debug, PartialEq, Clone, Serialize)]
struct ErrorGeneric {
    error: String,
}

#[post("/", format = "application/json", data = "<data>")]
pub async fn endpoint_user_sign_up(data: Data<'_>, lg: LanguageGuard) -> Result<Json<SessionProxy>, Custom<String>> {
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
        araucaria_plugins::deserialize::deserialize_from_json::<UserSignUpWrapper>(json_value, &USER_SIGN_UP_SCHEMA, &language_to_locale(&lg.0));

    if let Err(err) = result_deserialize {
        return Err(status::Custom(Status::UnprocessableEntity, serde_json::to_string(&err).unwrap()));
    }
    let user = result_deserialize.unwrap().0;
    let repository = get_user_repository();
    let result_create = user_sign_up(repository, get_id_generator(), get_date_time_generator(), get_encode_session_service(), user);
    if let Err(err) = result_create {
        match err {
            UserErr::DB(db_err) => {
                return Err(status::Custom(
                    Status::ServiceUnavailable,
                    serde_json::to_string(&ErrorGeneric { error: "There was an error with the dabatase.".to_string() }).unwrap(),
                ));
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
    return Ok(Json(SessionProxy::from(result)));
}

#[put("/", format = "application/json")]
pub fn endpoint_user_update() {}

#[get("/", format = "application/json")]
pub fn endpoint_user_read() {}

#[post("/sign_in", format = "application/json")]
pub fn endpoint_user_sign_in() {}

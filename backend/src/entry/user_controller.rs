use domain::{
    schedule::user::{
        create::{user_create, UserCreate, UserCreateResult, USER_CREATE_SCHEMA},
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

#[derive(Deserialize)]
#[serde(remote = "UserCreate")]
struct UserCreateProxy {
    email: String,
    first_name: String,
    birthdate: String,
    username: String,
    password: String,
}

struct UserCreateWrapper(pub UserCreate);

impl<'de> Deserialize<'de> for UserCreateWrapper {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        UserCreateProxy::deserialize(deserializer).map(UserCreateWrapper)
    }
}

#[derive(Debug, PartialEq, Clone, Serialize)]
struct UserProxy {
    id: String,
    first_name: String,
    birthdate: String,
    email: String,
    username: String,
    created_at: String,
    password: String,
    updated_at: String,
}

#[derive(Debug, PartialEq, Clone, Serialize)]
struct SessionProxy {
    token: String,
}

#[derive(Debug, PartialEq, Serialize)]
struct UserCreateResultProxy {
    user: UserProxy,
    session: SessionProxy,
}

impl From<UserCreateResult> for UserCreateResultProxy {
    fn from(value: UserCreateResult) -> Self {
        UserCreateResultProxy {
            user: UserProxy {
                id: value.user.id,
                first_name: value.user.first_name,
                birthdate: value.user.birthdate,
                email: value.user.email,
                username: value.user.username,
                created_at: value.user.created_at,
                password: value.user.password,
                updated_at: value.user.updated_at,
            },
            session: SessionProxy {
                token: value.session.token
            }
        }
    }
}


#[derive(Debug, PartialEq, Clone, Serialize)]
struct ErrorGeneric {
    error: String,
}

#[post("/", format = "application/json", data = "<data>")]
pub async fn endpoint_user_create(data: Data<'_>, lg: LanguageGuard) -> Result<Json<UserCreateResultProxy>, Custom<String>> {
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
    return Ok(Json(UserCreateResultProxy::from(result)));
}

#[put("/", format = "application/json")]
pub fn endpoint_user_update() {}

#[get("/", format = "application/json")]
pub fn endpoint_user_read() {}

#[post("/login", format = "application/json")]
pub fn endpoint_user_login() {}

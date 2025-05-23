use axum::{
    Json,
    extract::{Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::{Deserialize, Deserializer, Serialize};
use serde_json::Value;

use domain::{
    schedule::user::{
        error::UserErr,
        update::{USER_UPDATE_SCHEMA, UserUpdateInput, user_update},
    },
    session::{Session, SessionErr},
};
use uuid::Uuid;

use crate::{
    entry::deps::{DATE_TIME_GENERATOR, SESSION_ENCODE_SERVICER_GENERATOR},
    infra::{schedule::user::db_repository::UserRepositoryDB, validation::language_to_locale},
    server::{AppState, LanguageGuard},
};

#[derive(Deserialize)]
#[serde(remote = "UserUpdateInput")]
struct UserUpdateInputProxy {
    email: String,
    first_name: String,
    birthdate: String,
    username: String,
    password: String,
}

struct UserSignUpWrapper(pub UserUpdateInput);

impl<'de> Deserialize<'de> for UserSignUpWrapper {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        UserUpdateInputProxy::deserialize(deserializer).map(UserSignUpWrapper)
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

pub async fn endpoint_user_update(
    state: State<AppState>,
    lg: LanguageGuard,
    Path(user_id): Path<Uuid>,
    Json(value): Json<Value>,
) -> Response {
    let deserialized = araucaria_plugins::deserialize::deserialize_from_json::<UserSignUpWrapper>(
        value,
        &USER_UPDATE_SCHEMA,
        &language_to_locale(&lg.0),
    );
    if let Err(e) = deserialized {
        return (StatusCode::UNPROCESSABLE_ENTITY, Json(e)).into_response();
    }
    let user = (deserialized.unwrap()).0;
    let repo = UserRepositoryDB { db: &state.conn };
    let result_create = user_update(
        &repo,
        &*DATE_TIME_GENERATOR,
        &*SESSION_ENCODE_SERVICER_GENERATOR,
        user_id.to_string(),
        user,
    )
    .await;
    match result_create {
        Ok(session) => (StatusCode::OK, Json(SessionProxy::from(session))).into_response(),
        Err(e) => {
            let (code, msg) = match e {
                UserErr::DB(_) => {
                    (StatusCode::SERVICE_UNAVAILABLE, "There was an error with the dabatase")
                }
                UserErr::UserUniqueInfoField(u) => {
                    let msg = match (u.email, u.username) {
                        (true, true) => "There is already an user with this email and username",
                        (true, false) => "There is already an user with this email",
                        (false, true) => "There is already an user with this username",
                        _ => "",
                    };
                    (StatusCode::UNPROCESSABLE_ENTITY, msg)
                }
                UserErr::UserIdNotFound(_) => (StatusCode::NOT_FOUND, "The user was not found"),
                UserErr::UserCredentialsNotFound(_) => {
                    (StatusCode::UNAUTHORIZED, "Wrong username or password")
                }
                UserErr::Session(se) => match se {
                    SessionErr::Encode(_) => (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        "It was not possible to create your session",
                    ),
                    SessionErr::Decode(_) => (StatusCode::UNAUTHORIZED, "Your session is invalid"),
                },
            };
            (code, Json(ErrorGeneric { error: msg.into() })).into_response()
        }
    }
}

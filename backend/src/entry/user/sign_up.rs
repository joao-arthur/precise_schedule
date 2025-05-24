use araucaria_plugins::deserialize::deserialize_from_json;
use axum::{
    Json,
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::{Deserialize, Deserializer, Serialize};
use serde_json::Value;

use domain::{
    schedule::user::{
        error::UserErr,
        sign_up::{USER_SIGN_UP_SCHEMA, UserSignUpInput, user_sign_up},
    },
    session::EncodedSession,
};

use crate::{
    common::language::LanguageExtractor,
    common::{error::AppError, state::AppState},
    entry::deps::{DATE_TIME_GENERATOR, ID_GENERATOR, SESSION_ENCODE_SERVICER_GENERATOR},
    infra::{schedule::user::db_repository::UserRepositoryDB, validation::language_to_locale},
};

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

impl From<EncodedSession> for SessionProxy {
    fn from(value: EncodedSession) -> Self {
        SessionProxy { token: value.token }
    }
}

pub async fn endpoint_user_sign_up(
    state: State<AppState>,
    LanguageExtractor(language): LanguageExtractor,
    Json(value): Json<Value>,
) -> Response {
    let deserialized = deserialize_from_json::<UserSignUpWrapper>(
        value,
        &USER_SIGN_UP_SCHEMA,
        &language_to_locale(&language),
    );
    if let Err(e) = deserialized {
        return (StatusCode::UNPROCESSABLE_ENTITY, Json(e)).into_response();
    }
    let user = (deserialized.unwrap()).0;
    let repo = UserRepositoryDB { db: &state.conn };
    let result_create = user_sign_up(
        &repo,
        &*ID_GENERATOR,
        &*DATE_TIME_GENERATOR,
        &*SESSION_ENCODE_SERVICER_GENERATOR,
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
                UserErr::EncodeSession(_) => (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "It was not possible to create your session",
                ),
            };
            (code, Json(AppError { error: msg.into() })).into_response()
        }
    }
}

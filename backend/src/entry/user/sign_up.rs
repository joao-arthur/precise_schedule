use axum::{
    extract::State, http::StatusCode, response::{IntoResponse, Response}, Json
};
use domain::{
    schedule::user::{
        error::UserErr,
        sign_up::{USER_SIGN_UP_SCHEMA, UserSignUpInput, user_sign_up},
    },
    session::{Session, SessionErr},
};
use serde::{Deserialize, Deserializer, Serialize};
use serde_json::Value;

use crate::{infra::validation::language_to_locale, AppState, LanguageGuard};

use crate::entry::deps::{
    DATE_TIME_GENERATOR, ID_GENERATOR, SESSION_ENCODE_SERVICER_GENERATOR, USER_REPOSITORY,
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

impl From<Session> for SessionProxy {
    fn from(value: Session) -> Self {
        SessionProxy { token: value.token }
    }
}

#[derive(Debug, PartialEq, Clone, Serialize)]
struct ErrorGeneric {
    error: String,
}

pub async fn endpoint_user_sign_up(
    state: State<AppState>,
    lg: LanguageGuard,
    Json(value): Json<Value>
) -> Response {
    let deserialized = araucaria_plugins::deserialize::deserialize_from_json::<UserSignUpWrapper>(
        value,
        &USER_SIGN_UP_SCHEMA,
        &language_to_locale(&lg.0),
    );
    if let Err(e) = deserialized {
        return (StatusCode::UNPROCESSABLE_ENTITY, Json(e)).into_response();
    }
    let user = (deserialized.unwrap()).0;
    let result_create = user_sign_up(
        &*USER_REPOSITORY,
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

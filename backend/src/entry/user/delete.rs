use axum::{
    Json,
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};

use domain::{
    schedule::user::{
        delete::user_delete, error::UserErr
    },
};

use crate::{
    common::{error::AppError, language::LanguageExtractor, session::SessionExtractor, state::AppState},
    infra::{schedule::user::db_repository::UserRepositoryDB},
};

pub async fn endpoint_user_delete(
    state: State<AppState>,
    SessionExtractor(session): SessionExtractor,
    LanguageExtractor(language): LanguageExtractor,
) -> Response {
    let repo = UserRepositoryDB { db: &state.conn };
    let deleted_user = user_delete(
        &session,
        &repo,
    )
    .await;
    match deleted_user {
        Ok(_) => StatusCode::NO_CONTENT.into_response(),
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

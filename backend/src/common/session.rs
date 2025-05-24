use axum::{
    Json,
    extract::FromRequestParts,
    http::{request::Parts, status::StatusCode},
    response::{IntoResponse, Response},
};
use domain::session::SessionDecodeService;

use crate::infra::session::SessionDecodeServiceJWT;

use super::error::AppError;

#[derive(Debug, PartialEq)]
pub struct UserSession {
    pub id: String,
    pub username: String,
}

#[derive(Debug, PartialEq)]
pub struct SessionExtractor(pub UserSession);

impl<S> FromRequestParts<S> for SessionExtractor
where
    S: Send + Sync,
{
    type Rejection = Response;

    async fn from_request_parts(parts: &mut Parts, _s: &S) -> Result<Self, Self::Rejection> {
        parts
            .headers
            .get("Authorization")
            .and_then(|header| header.to_str().ok())
            .map(|header| header.replace("Bearer ", ""))
            .map(|token| domain::session::Session { token })
            .and_then(|session| SessionDecodeServiceJWT.decode(session).ok())
            .map(|id| SessionExtractor(UserSession { id, username: "".into() }))
            .ok_or_else(|| {
                (
                    StatusCode::UNAUTHORIZED,
                    Json(AppError { error: "Your session is invalid".into() }),
                )
                    .into_response()
            })
    }
}

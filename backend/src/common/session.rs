use axum::{
    Json,
    extract::FromRequestParts,
    http::{request::Parts, status::StatusCode},
    response::{IntoResponse, Response},
};

use domain::session::{EncodedSession, Session};

use crate::infra::session::decode_jwt_session;

use super::error::AppError;

#[derive(Debug, PartialEq)]
pub struct SessionExtractor(pub Session);

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
            .and_then(|header| {
                decode_jwt_session(EncodedSession { token: header.replace("Bearer ", "") }).ok()
            })
            .map(|session| SessionExtractor(session))
            .ok_or_else(|| {
                (
                    StatusCode::UNAUTHORIZED,
                    Json(AppError { error: "Your session is invalid".into() }),
                )
                    .into_response()
            })
    }
}

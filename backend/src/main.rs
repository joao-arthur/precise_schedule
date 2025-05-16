use axum::{
    Router,
    extract::{DefaultBodyLimit, FromRequestParts},
    http::request::Parts,
    response::Response,
    routing::{get, post},
};

use accept_language::parse;
use domain::language::Language;
use entry::{health_controller::endpoint_health_check, user::endpoint_user_sign_up};
use tower_http::limit::RequestBodyLimitLayer;

mod entry;
mod infra;

rust_i18n::i18n!("locales");

#[derive(Debug, PartialEq)]
pub struct LanguageGuard(pub Language);

impl<S> FromRequestParts<S> for LanguageGuard
where
    S: Send + Sync,
{
    type Rejection = Response;

    async fn from_request_parts(parts: &mut Parts, _s: &S) -> Result<Self, Self::Rejection> {
        let lang = parts
            .headers
            .get("Accept-Language")
            .and_then(|header| header.to_str().ok())
            .and_then(|header| parse(header).get(0).cloned())
            .unwrap_or_else(|| "en".into());
        Ok(LanguageGuard(Language::from_iso_639_1(&lang)))
    }
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/health", get(endpoint_health_check))
        .route("/user", post(endpoint_user_sign_up))
        .layer(DefaultBodyLimit::disable())
        .layer(RequestBodyLimitLayer::new(1024 * 1024))
        .layer(tower_http::trace::TraceLayer::new_for_http());
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

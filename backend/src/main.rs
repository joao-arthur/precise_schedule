use axum::{
    Router,
    extract::{DefaultBodyLimit, FromRequestParts},
    http::request::Parts,
    response::Response,
    routing::{get, post},
};
use migration::Migrator;
use sea_orm::{Database, DatabaseConnection};

use accept_language::parse;
use domain::language::Language;
use entry::{health_controller::endpoint_health_check, user::endpoint_user_sign_up};
use sea_orm_migration::MigratorTrait;
use tower_http::{limit::RequestBodyLimitLayer, trace::TraceLayer};

mod entry;
mod infra;
mod migration;

rust_i18n::i18n!("locales");

#[derive(Clone)]
struct AppState {
    pub conn: DatabaseConnection,
}

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
    // dotenvy::dotenv().ok();
    // let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    // let host = env::var("HOST").expect("HOST is not set in .env file");
    // let port = env::var("PORT").expect("PORT is not set in .env file");
    // let server_url = format!("{host}:{port}");
    let conn = Database::connect("postgres://postgres:123456@localhost:5432/precise_schedule")
        .await
        .expect("Database connection failed");
    Migrator::up(&conn, None).await.unwrap();
    let state = AppState { conn };

    let app = Router::new()
        .route("/health", get(endpoint_health_check))
        .route("/user", post(endpoint_user_sign_up))
        .layer(DefaultBodyLimit::disable())
        .layer(RequestBodyLimitLayer::new(1024 * 1024))
        .layer(TraceLayer::new_for_http())
        .with_state(state);
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

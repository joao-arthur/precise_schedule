use axum::{
    Router,
    extract::DefaultBodyLimit,
    routing::{get, post},
};
use sea_orm::Database;
use sea_orm_migration::MigratorTrait;
use tower_http::{limit::RequestBodyLimitLayer, trace::TraceLayer};
use tracing::Level;

use crate::{
    common::state::AppState,
    entry::{
        health_controller::endpoint_health_check,
        user::{
            delete::endpoint_user_delete, sign_up::endpoint_user_sign_up,
            update::endpoint_user_update,
        },
    },
    migration::Migrator,
};

rust_i18n::i18n!("locales");

pub async fn start_server() {
    // dotenvy::dotenv().ok();
    // let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    // let host = env::var("HOST").expect("HOST is not set in .env file");
    // let port = env::var("PORT").expect("PORT is not set in .env file");
    // let server_url = format!("{host}:{port}");
    let subscriber =
        tracing_subscriber::FmtSubscriber::builder().with_max_level(Level::INFO).finish();
    tracing::subscriber::set_global_default(subscriber).expect("setting default subscriber failed");
    tracing::info!("Connecting to database...");
    let conn = Database::connect("postgres://postgres:123456@localhost:5432/precise_schedule")
        .await
        .expect("Database connection failed");
    tracing::info!("✅ Connected to database");
    Migrator::up(&conn, None).await.expect("Migrations failed");
    let state = AppState { conn };
    let app = Router::new()
        .route("/health", get(endpoint_health_check))
        .route("/user", post(endpoint_user_sign_up).delete(endpoint_user_delete))
        .route("/user/{user_id}", post(endpoint_user_update))
        .layer(DefaultBodyLimit::disable())
        .layer(RequestBodyLimitLayer::new(1024 * 1024))
        .layer(TraceLayer::new_for_http())
        .with_state(state);
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    tracing::info!("🚀 Server is running at http://localhost:8000");
    axum::serve(listener, app).await.unwrap();
}

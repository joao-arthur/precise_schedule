use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;

#[derive(Debug, PartialEq, Clone, Serialize)]
struct Health {
    status: String,
}

pub async fn endpoint_health_check() -> Response {
    (StatusCode::OK, Json(Health { status: "OK".into() })).into_response()
}

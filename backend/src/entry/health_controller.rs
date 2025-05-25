use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use serde::Serialize;

#[derive(Debug, PartialEq, Clone, Serialize)]
struct Message {
    message: String,
}

pub async fn endpoint_health_check() -> Response {
    let status = StatusCode::OK;
    let body = Message {
        message: r#""You're still alive," she said, oh, and do I deserve to be?"#.into(),
    };
    (status, Json(body)).into_response()
}

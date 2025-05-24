use serde::Serialize;

#[derive(Debug, PartialEq, Serialize)]
pub struct AppError {
    pub error: String,
}

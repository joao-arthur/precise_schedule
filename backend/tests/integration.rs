use axum::http::StatusCode;
use reqwest::{
    Client,
    header::{ACCEPT_LANGUAGE, HeaderMap, HeaderValue},
};
use serde::Deserialize;
use serde_json::json;
use tokio;

use backend::server::start_server;

#[derive(Deserialize, Debug, PartialEq)]
struct ErrorBody {
    message: String,
}

#[derive(Deserialize)]
pub struct Session {
    pub token: String,
}

#[tokio::test]
async fn integration_tests() {
    let _srv = tokio::spawn(async { start_server().await });
    tokio::time::sleep(std::time::Duration::from_millis(5000)).await;
    let session = test_sign_up_ok().await;
}

async fn test_sign_up_ok() -> Session {
    let mut headers = HeaderMap::new();
    headers.insert(ACCEPT_LANGUAGE, HeaderValue::from_static("pt-BR"));
    let client = Client::builder().default_headers(headers.clone()).build().unwrap();
    let req_body = json!({
        "email": "olivia@gmail.com",
        "first_name": "Olivia Isabel Rodrigo",
        "birthdate": "2003-02-20",
        "username": "rod:)",
        "password": "oL1v1@",
    });
    let res = client.post("http://127.0.0.1:8000/user").json(&req_body).send().await.unwrap();
    let status = res.status();
    let body = res.json::<Session>().await.unwrap();
    assert_eq!(status, StatusCode::OK);

    body
}

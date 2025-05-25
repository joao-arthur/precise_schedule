use axum::http::StatusCode;
use reqwest::{
    header::{HeaderMap, HeaderValue, ACCEPT_LANGUAGE, AUTHORIZATION, CONTENT_TYPE}, Client
};
use serde::Deserialize;
use serde_json::json;
use tokio;

#[derive(Deserialize, Debug, PartialEq)]
struct ErrorBody {
    message: String,
}

#[derive(Debug, PartialEq, Deserialize)]
pub struct EncodedSession {
    pub token: String,
}

fn build_sessionless_client() -> Client {
    let mut headers = HeaderMap::new();
    headers.insert(ACCEPT_LANGUAGE, HeaderValue::from_static("pt-BR"));
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));
    Client::builder().default_headers(headers.clone()).build().unwrap()
}

fn build_sessionful_client(token: &str) -> Client {
    let bearer_token = "Bearer ".to_string() + token;
    let mut headers = HeaderMap::new();
    headers.insert(ACCEPT_LANGUAGE, HeaderValue::from_static("pt-BR"));
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));
    headers.insert(AUTHORIZATION, HeaderValue::from_str(&bearer_token).unwrap());
    Client::builder().default_headers(headers.clone()).build().unwrap()
}


#[tokio::test]
async fn integration_tests() {
    let sessionless_client = build_sessionless_client();

    let token = test_user_sign_up(&sessionless_client).await;

    let sessionful_client = build_sessionful_client(&token);

    test_user_delete(&sessionful_client).await;
}

async fn test_user_sign_up(client: &Client) -> String {
    let req_body = json!({
        "first_name": "Olivia Isabel Rodrigo",
        "email": "olivia@gmail.com",
        "birthdate": "2003-02-20",
        "username": "rod:)",
        "password": "oL1v1@",
    });
    let res = client.post("http://localhost:8000/user").json(&req_body).send().await.unwrap();
    let status = res.status();
    let body = res.json::<EncodedSession>().await.unwrap();
    assert_eq!(status, StatusCode::OK);

    body.token
}

async fn test_user_delete(client: &Client) {
    let res = client.delete("http://localhost:8000/user").send().await.unwrap();
    assert_eq!(res.status(), StatusCode::NO_CONTENT);
}

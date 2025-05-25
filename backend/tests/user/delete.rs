use reqwest::{Client, StatusCode};
use serde_json::json;

pub async fn test_user_delete(client: &Client) {
    let res = client.delete("http://localhost:8000/user").send().await.unwrap();
    assert_eq!(res.status(), StatusCode::NO_CONTENT);
}

pub async fn test_user_delete_sessionless(client: &Client) {
    let res = client.delete("http://localhost:8000/user").send().await.unwrap();
    let status = res.status();
    let body = res.json::<serde_json::Value>().await.unwrap();
    assert_eq!(status, StatusCode::UNAUTHORIZED);
    assert_eq!(body, json!({ "error": "Your session is invalid" }));
}

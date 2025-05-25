use reqwest::{Client, StatusCode};
use serde::Deserialize;
use serde_json::json;

#[derive(Debug, PartialEq, Deserialize)]
struct EncodedSession {
    pub token: String,
}

pub async fn test_user_sign_up(client: &Client) -> String {
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

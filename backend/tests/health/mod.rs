use reqwest::{Client, StatusCode};
use serde_json::{Value, json};

pub async fn test_healthcheck(client: &Client) {
    let res = client.get("http://localhost:8000/health").send().await.unwrap();
    let status = res.status();
    let body = res.json::<Value>().await.unwrap();
    assert_eq!(status, StatusCode::OK);
    assert_eq!(
        body,
        json!({
            "message": r#""You're still alive," she said, oh, and do I deserve to be?"#,
        })
    );
}

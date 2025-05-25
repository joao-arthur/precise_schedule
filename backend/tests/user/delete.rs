use reqwest::{Client, StatusCode};

pub async fn test_user_delete(client: &Client) {
    let res = client.delete("http://localhost:8000/user").send().await.unwrap();
    assert_eq!(res.status(), StatusCode::NO_CONTENT);
}

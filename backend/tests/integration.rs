use reqwest::{
    Client,
    header::{ACCEPT_LANGUAGE, AUTHORIZATION, CONTENT_TYPE, HeaderMap, HeaderValue},
};
use tokio;

use health::test_healthcheck;
use user::{
    delete::{test_user_delete, test_user_delete_sessionless},
    sign_up::{test_user_sign_up, test_user_sign_up_empty_body},
    update::{test_user_update, test_user_update_empty_body, test_user_update_sessionless},
};

mod health;
mod user;

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

    test_healthcheck(&sessionless_client).await;

    let token = test_user_sign_up(&sessionless_client).await;
    let sessionful_client = build_sessionful_client(&token);
    test_user_sign_up_empty_body(&sessionless_client).await;

    let token = test_user_update(&sessionful_client).await;
    let sessionful_client = build_sessionful_client(&token);
    test_user_update_empty_body(&sessionful_client).await;
    test_user_update_sessionless(&sessionless_client).await;

    test_user_delete(&sessionful_client).await;
    test_user_delete_sessionless(&sessionless_client).await;
}

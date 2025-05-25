use reqwest::{Client, StatusCode};
use serde::Deserialize;
use serde_json::json;

#[derive(Debug, PartialEq, Deserialize)]
struct EncodedSession {
    pub token: String,
}

pub async fn test_user_update(client: &Client) -> String {
    let req_body = json!({
        "first_name": "Olivia Rodrigo",
        "email": "olivia_rodrigo@gmail.com",
        "birthdate": "2003-02-20",
        "username": "olivia",
        "password": "oL1v1@2dh89D",
    });
    let res = client.put("http://localhost:8000/user").json(&req_body).send().await.unwrap();
    let status = res.status();
    let body = res.json::<EncodedSession>().await.unwrap();
    assert_eq!(status, StatusCode::OK);

    body.token
}

pub async fn test_user_update_empty_body(client: &Client) {
    let req_body = json!({});
    let res = client.post("http://localhost:8000/user").json(&req_body).send().await.unwrap();
    let status = res.status();
    let body = res.json::<serde_json::Value>().await.unwrap();
    assert_eq!(status, StatusCode::UNPROCESSABLE_ENTITY);
    pretty_assertions::assert_eq!(
        body,
        json!({
            "first_name": [
                "É obrigatório",
                "Deve ser uma string",
                "A quantidade de caracteres deve estar entre 1 e 256"
            ],
            "email": ["É obrigatório", "Deve ser um e-mail"],
            "birthdate": [
                "É obrigatório",
                "Deve ser uma data",
                r#"Deve ser maior ou igual a "1970-01-01""#
            ],
            "username": [
                "É obrigatório",
                "Deve ser uma string",
                "A quantidade de caracteres deve estar entre 1 e 64"
            ],
            "password": [
                "É obrigatório",
                "Deve ser uma string",
                "A quantidade de caracteres deve estar entre 1 e 64",
                "A quantidade de caracteres minúsculos deve ser maior ou igual a 1",
                "A quantidade de caracteres maiúsculos deve ser maior ou igual a 1",
                "A quantidade de números deve ser maior ou igual a 1",
                "A quantidade de símbolos deve ser maior ou igual a 1"
            ],
        })
    );
}

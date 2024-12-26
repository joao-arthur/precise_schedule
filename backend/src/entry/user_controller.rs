use std::collections::HashMap;
use std::sync::LazyLock;

use rocket::data::ToByteUnit;
use rocket::http::HeaderMap;
use rocket::response::content;
use rocket::response::status::Custom;
use rocket::serde::{self, json, Deserialize, Serialize};
use rocket::{http::Status, post, response::status, Data};
use serde_json::Value;

use crate::domain::validation::{Schema, V};
use crate::entry::deps::get_validator;
use crate::infra::validation::adapter::{
    to_english, to_portuguese, to_spanish, value_from_json_value,
};
use crate::{Language, Languages};

#[derive(Deserialize, Serialize, Debug)]
#[serde(crate = "rocket::serde")]
pub struct UserCCDD<'a> {
    pub email: &'a str,
    pub first_name: &'a str,
    pub birthdate: &'a str,
    pub username: &'a str,
    pub password: &'a str,
}

#[derive(Debug, PartialEq, Clone, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct User {
    pub id: String,
    pub first_name: String,
    pub birthdate: String,
    pub email: String,
    pub username: String,
    pub created_at: String,
    pub password: String,
    pub updated_at: String,
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct UserCResult {
    pub user: User,
    pub session: Session,
}

#[derive(Debug, PartialEq, Clone, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Session {
    pub token: String,
}

#[post("/", format = "application/json", data = "<data>")]
pub async fn endpoint_user_c(data: Data<'_>, lg: Language) -> Custom<content::RawJson<String>> {
    let limit = 1.mebibytes();
    let body = match data.open(limit).into_string().await {
        Ok(body) => body.value,
        Err(_) => {
            return status::Custom(
                Status::PayloadTooLarge,
                content::RawJson("Payload is too large.".to_owned()),
            );
        }
    };

    static USER_C_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
        HashMap::from([
            ("first_name", vec![V::Required, V::Str, V::StrMinLen(1), V::StrMaxLen(256)]),
            ("birthdate", vec![V::Required, V::Str, V::Dt, V::DtMin("1970-01-01")]),
            ("email", vec![V::Required, V::Str, V::Email]),
            ("username", vec![V::Required, V::Str, V::StrMinLen(1), V::StrMaxLen(32)]),
            (
                "password",
                vec![
                    V::Required,
                    V::Str,
                    V::StrMinLen(1),
                    V::StrMaxLen(32),
                    V::StrMinUpper(1),
                    V::StrMinLower(1),
                    V::StrMinSpecial(1),
                    V::StrMinNum(1),
                ],
            ),
        ])
    });

    let json_value: Value = serde_json::from_str(&body).unwrap();
    let internal_value = value_from_json_value(json_value);

    let res = get_validator().validate(&USER_C_SCHEMA, &internal_value);
    match res {
        Ok(_data) => {
            return status::Custom(Status::Ok, content::RawJson("".to_owned()));
        }
        Err(err) => {
            let erri18n: HashMap<&str, Vec<String>> = err
                .into_iter()
                .map(|f| {
                    (
                        f.0,
                        f.1.iter()
                            .map(|p| match lg.0 {
                                Languages::English => to_english(p),
                                Languages::Portuguese => to_portuguese(p),
                                Languages::Spanish => to_spanish(p),
                            })
                            .collect::<Vec<String>>(),
                    )
                })
                .map(|f| f)
                .collect();
            return status::Custom(
                Status::UnprocessableEntity,
                content::RawJson(serde_json::to_string(&erri18n).unwrap()),
            );
        }
    }

    // Attempt to deserialize the JSON
    // let task: Result<User, _> = json::from_str(&body);
    // match task {
    //     Ok(task) => status::Custom(
    //         Status::Ok,
    //         format!(
    //             "Task received: description = {}, complete = {}",
    //             task.email, task.first_name
    //         ),
    //     ),
    //     Err(err) => status::Custom(
    //         Status::UnprocessableEntity,
    //         format!("Failed to parse JSON: {}", err),
    //     ),
    // }

    /* let user = UserC {
        email: user.email.to_string(),
        first_name: user.first_name.to_string(),
        birthdate: user.birthdate.to_string(),
        username: user.username.to_string(),
        password: user.password.to_string(),
    };
    let repo = get_user_repo();

    let temp = user_c(
        get_validator(),
        repo,
        get_id_gen(),
        get_date_time_gen(),
        get_session_service(),
        user,
    )
    .unwrap();

    Json(UserCResult {
        user: User {
            id: temp.user.id.clone(),
            first_name: temp.user.first_name.clone(),
            birthdate: temp.user.birthdate.clone(),
            email: temp.user.email.clone(),
            username: temp.user.username.clone(),
            created_at: temp.user.created_at.clone(),
            password: temp.user.password.clone(),
            updated_at: temp.user.updated_at.clone(),
        },
        session: Session { token: temp.session.token },
    }) */
}

#[put("/", format = "application/json")]
pub fn endpoint_user_u() {}

#[get("/", format = "application/json")]
pub fn endpoint_user_r() {}

#[post("/login", format = "application/json")]
pub fn endpoint_user_login() {}

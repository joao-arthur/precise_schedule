use rocket::data::ToByteUnit;
use rocket::serde::{self, json, Deserialize, Serialize};
use rocket::{http::Status, post, response::status, Data};
use serde_json::Value;

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
pub async fn endpoint_user_c(data: Data<'_>) {
    let limit = 1.mebibytes();
    let body = match data.open(limit).into_string().await {
        Ok(body) => body.value,
        Err(_) => {
            return;
            //return status::Custom(
            //    Status::PayloadTooLarge,
            //    "Payload is too large.".to_string(),
            //);
        }
    };
    let json_value: Value = serde_json::from_str(&body).unwrap();
    match &json_value {
        Value::Object(map) => {
            for (key, value) in map {
                match value {
                    Value::Null => {}
                    Value::Bool(_bool) => {}
                    Value::Number(num) => {
                        if num.is_f64() {}
                        if num.is_u64() {}
                        if num.is_i64() {}
                    }
                    Value::String(_str) => {}
                    Value::Array(_arr) => {}
                    Value::Object(_obj) => {}
                }
                println!("Key: {}, Value: {}", key, value);
            }
        }
        _ => println!("Expected a JSON object"),
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

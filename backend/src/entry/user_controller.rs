use rocket::serde::{json::Json, Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
#[serde(crate = "rocket::serde")]
pub struct UserCEndpointModel<'a> {
    pub email: &'a str,
    pub first_name: &'a str,
    pub birthdate: &'a str,
    pub username: &'a str,
    pub password: &'a str,
    pub optional_field: Option<&'a str>,
    pub optional_num: Option<u64>,
}

#[post("/", format = "application/json", data = "<user>")]
pub fn user_c(user: Json<UserCEndpointModel<'_>>) -> Json<UserCEndpointModel> {
    user
}

#[put("/", format = "application/json")]
pub fn user_u() {}

#[get("/", format = "application/json")]
pub fn user_r() {}

#[post("/login", format = "application/json")]
pub fn user_login() {}

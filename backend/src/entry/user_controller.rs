use std::sync::OnceLock;

use rocket::serde::{json::Json, Deserialize, Serialize};

use crate::{
    domain::schedule::user::create::{user_c, UserC},
    infra::{
        generator::{DateTimeGenImpl, IdGenUUID4},
        schedule::user::repo_vec::UserRepoVec,
        session::SessionServiceJWT,
        validation::ValidatorCustom,
    },
};

static USER_REPO: OnceLock<UserRepoVec> = OnceLock::new();
static ID_GEN: OnceLock<IdGenUUID4> = OnceLock::new();
static DATE_TIME_GEN: OnceLock<DateTimeGenImpl> = OnceLock::new();
static VALIDATOR: OnceLock<ValidatorCustom> = OnceLock::new();
static SESSION_SERVICE: OnceLock<SessionServiceJWT> = OnceLock::new();

pub fn get_user_repo() -> &'static UserRepoVec {
    USER_REPO.get_or_init(|| UserRepoVec::default())
}

pub fn get_id_gen() -> &'static IdGenUUID4 {
    ID_GEN.get_or_init(|| IdGenUUID4)
}

pub fn get_date_time_gen() -> &'static DateTimeGenImpl {
    DATE_TIME_GEN.get_or_init(|| DateTimeGenImpl)
}

pub fn get_validator() -> &'static ValidatorCustom {
    VALIDATOR.get_or_init(|| ValidatorCustom)
}

pub fn get_session_service() -> &'static SessionServiceJWT {
    SESSION_SERVICE.get_or_init(|| SessionServiceJWT)
}

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

#[post("/", format = "application/json", data = "<user>")]
pub fn endpoint_user_c(user: Json<UserCCDD<'_>>) -> Json<UserCResult> {
    let user = UserC {
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
    })
}

#[put("/", format = "application/json")]
pub fn endpoint_user_u() {}

#[get("/", format = "application/json")]
pub fn endpoint_user_r() {}

#[post("/login", format = "application/json")]
pub fn endpoint_user_login() {}

use std::convert::Infallible;

use accept_language::parse;
use domain::language::Language;
use entry::{
    event_controller::{
        endpoint_event_appointment_c, endpoint_event_appointment_u, endpoint_event_birthday_c, endpoint_event_birthday_u, endpoint_event_d,
        endpoint_event_date_c, endpoint_event_date_u, endpoint_event_meeting_c, endpoint_event_meeting_u, endpoint_event_party_c,
        endpoint_event_party_u, endpoint_event_r_many, endpoint_event_r_one,
    },
    health_controller::endpoint_health_r,
    user_controller::{endpoint_user_c, endpoint_user_login, endpoint_user_r, endpoint_user_u},
};
use rocket::{
    Request,
    request::{self, FromRequest},
};

pub mod entry;
pub mod infra;

#[macro_use]
extern crate rocket;

#[derive(Debug, PartialEq)]
pub struct LanguageGuard(pub Language);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for LanguageGuard {
    type Error = Infallible;

    async fn from_request(req: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        let user_languages = req.headers().get_one("Accept-Language");
        match user_languages {
            Some(t) => {
                let user_languages = parse(t);
                let lg = user_languages.get(0).cloned().unwrap_or(String::from("en"));
                request::Outcome::Success(LanguageGuard(Language::from_iso_639_1(&lg)))
            }
            None => request::Outcome::Success(LanguageGuard(Language::English)),
        }
    }
}

rust_i18n::i18n!("locales");

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    rocket::build()
        .mount("/", routes![endpoint_health_r])
        .mount(
            "/event",
            routes![
                endpoint_event_appointment_c,
                endpoint_event_appointment_u,
                endpoint_event_birthday_c,
                endpoint_event_birthday_u,
                endpoint_event_d,
                endpoint_event_date_c,
                endpoint_event_date_u,
                endpoint_event_meeting_c,
                endpoint_event_meeting_u,
                endpoint_event_party_c,
                endpoint_event_party_u,
                endpoint_event_r_many,
                endpoint_event_r_one
            ],
        )
        .mount("/user", routes![endpoint_user_c, endpoint_user_r, endpoint_user_u, endpoint_user_login])
        .launch()
        .await?;

    Ok(())
}

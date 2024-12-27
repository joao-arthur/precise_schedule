use std::convert::Infallible;

use accept_language::parse;
use entry::{
    event_controller::{
        endpoint_event_appointment_c, endpoint_event_appointment_u, endpoint_event_birthday_c,
        endpoint_event_birthday_u, endpoint_event_d, endpoint_event_date_c, endpoint_event_date_u,
        endpoint_event_meeting_c, endpoint_event_meeting_u, endpoint_event_party_c,
        endpoint_event_party_u, endpoint_event_r_many, endpoint_event_r_one,
    },
    health_controller::endpoint_health_r,
    user_controller::{endpoint_user_c, endpoint_user_login, endpoint_user_r, endpoint_user_u},
};
use rocket::{
    request::{self, FromRequest},
    Request,
};

pub mod domain;
pub mod entry;
pub mod infra;

#[macro_use]
extern crate rocket;

#[derive(Debug, PartialEq)]
pub enum Languages {
    English,
    Portuguese,
    Spanish,
}

#[derive(Debug, PartialEq)]
pub struct Language(pub Languages);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for Language {
    type Error = Infallible;

    async fn from_request(req: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        let user_languages = req.headers().get_one("Accept-Language");

        match user_languages {
            Some(t) => {
                let user_languages = parse(t);
                let lg = user_languages.get(0).cloned().unwrap_or(String::from("en"));
                if lg == "en" || lg.starts_with("en-") {
                    return request::Outcome::Success(Language(Languages::English));
                }
                if lg == "es" || lg.starts_with("es-") {
                    return request::Outcome::Success(Language(Languages::Spanish));
                }
                if lg == "pt" || lg.starts_with("pt-") {
                    return request::Outcome::Success(Language(Languages::Portuguese));
                }
                return request::Outcome::Success(Language(Languages::English));
            }
            None => request::Outcome::Success(Language(Languages::English)),
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
        .mount(
            "/user",
            routes![endpoint_user_c, endpoint_user_r, endpoint_user_u, endpoint_user_login],
        )
        .launch()
        .await?;

    Ok(())
}
/*

use jsonschema::validator_for;
use serde_json::{from_str, json};

fn main() -> Result<(), Box<dyn std::error::Error>> {

    // One-off validation
  //  assert!(jsonschema::is_valid(&schema, &instance));
  //  assert!(jsonschema::validate(&schema, &instance).is_ok());
  // Build & reuse (faster)

  let instance = json!( {
        "password": "pasM$1sword",
        "email": "paul@gmail.com",
        "email_confirmation": "paul@gmail.com",
        "begin": "10:10",
        "end": "12:38",
    });

    let schema = from_str(include_str!("./2.json"))?;
    let validator = validator_for(&schema)?;
  println!("{:?}", validator.validate(&instance));


    // Boolean result
    //assert!(validator.is_valid(&instance));

    for error in validator.iter_errors(&instance) {
        eprintln!("Error: {error}");
        eprintln!("Location: {}", error.instance_path);
    }

    Ok(())
}
*/

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

pub mod domain;
pub mod entry;
pub mod infra;

#[macro_use]
extern crate rocket;

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
        ).launch().await?;

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

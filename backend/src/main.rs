use entry::{
    event_controller::{
        event_appointment_c, event_appointment_u, event_birthday_c, event_birthday_u, event_d,
        event_date_c, event_date_u, event_meeting_c, event_meeting_u, event_party_c, event_party_u,
        event_r_many, event_r_one,
    },
    health_controller::health_r,
    user_controller::{user_c, user_login, user_r, user_u},
};

pub mod domain;
pub mod entry;
pub mod infra;
//use domain::schedule::event::appointment::create::AppointmentCreateModel;
//use rocket::serde::json::Json;
//use serde_json::Value;
//use std::collections::HashMap;

#[macro_use]
extern crate rocket;

//#[post("/appointment", format = "application/json", data = "<event>")]
//fn post_event(event: Json<AppointmentCreateModel<'_>>) {
//    println!("{:?}", event);
//    let eventas: AppointmentCreateModel = event.into_inner();
//
//    let json = serde_json::to_string(&eventas).unwrap();
//    let map: HashMap<String, Value> = serde_json::from_str(&json).unwrap();
//
//    println!("{:?}", map);
//    for key in map.keys() {
//        println!("{key}");
//        let val = map.get(key);
//        println!("{:?}", val);
//    }
//}
//
#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![health_r])
        .mount(
            "/event",
            routes![
                event_appointment_c,
                event_appointment_u,
                event_birthday_c,
                event_birthday_u,
                event_d,
                event_date_c,
                event_date_u,
                event_meeting_c,
                event_meeting_u,
                event_party_c,
                event_party_u,
                event_r_many,
                event_r_one
            ],
        )
        .mount("/user", routes![user_c, user_r, user_u, user_login])
}

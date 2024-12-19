use entry::{
    event_controller::{
        event_appointment_c, event_appointment_u, event_birthday_c, event_birthday_u, event_d,
        event_date_c, event_date_u, event_meeting_c, event_meeting_u, event_party_c, event_party_u,
        event_r_many, event_r_one,
    },
    health_controller::health_r,
    user_controller::{user_c_endpoint, user_login, user_r, user_u},
};

pub mod domain;
pub mod entry;
pub mod infra;

#[macro_use]
extern crate rocket;

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
        .mount("/user", routes![user_c_endpoint, user_r, user_u, user_login])
}

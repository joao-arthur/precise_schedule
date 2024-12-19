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

#[launch]
fn rocket() -> _ {
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
}

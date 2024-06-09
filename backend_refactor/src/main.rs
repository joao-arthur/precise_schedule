pub mod domain;
pub mod infra;

#[macro_use]
extern crate rocket;

use domain::schedule::event::appointment::create::AppointmentCreateModel;
use rocket::serde::json::Json;

#[get("/")]
fn health_check() -> &'static str {
    "Hello, world!"
}

#[post("/appointment", format = "application/json", data = "<event>")]
fn post_event(event: Json<AppointmentCreateModel<'_>>) {
    println!("{:?}", event);
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![health_check, post_event])
}

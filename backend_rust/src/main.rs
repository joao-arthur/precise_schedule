pub mod domain;

fn main() {
    println!("Hello, world!");
}

//pub mod infra;

//#[macro_use]
//extern crate rocket;
//
//use domain::schedule::event::appointment::create::AppointmentCreateModel;
//use rocket::serde::json::Json;
//use serde_json::Value;
//use std::collections::HashMap;
//
//#[get("/")]
//fn health_check() -> &'static str {
//    "Hello, world!"
//}
//
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
//#[launch]
//fn rocket() -> _ {
//    rocket::build().mount("/", routes![health_check, post_event])
//}
//

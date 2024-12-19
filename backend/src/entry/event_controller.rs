#[post("/appointment", format = "application/json")]
pub fn endpoint_event_appointment_c() {}

#[post("/birthday", format = "application/json")]
pub fn endpoint_event_birthday_c() {}

#[post("/date", format = "application/json")]
pub fn endpoint_event_date_c() {}

#[post("/meeting", format = "application/json")]
pub fn endpoint_event_meeting_c() {}

#[post("/party", format = "application/json")]
pub fn endpoint_event_party_c() {}

#[put("/appointment/<id>", format = "application/json")]
pub fn endpoint_event_appointment_u(id: &str) {}

#[put("/birthday/<id>", format = "application/json")]
pub fn endpoint_event_birthday_u(id: &str) {}

#[put("/date/<id>", format = "application/json")]
pub fn endpoint_event_date_u(id: &str) {}

#[put("/meeting/<id>", format = "application/json")]
pub fn endpoint_event_meeting_u(id: &str) {}

#[put("/party/<id>", format = "application/json")]
pub fn endpoint_event_party_u(id: &str) {}

#[get("/<id>", format = "application/json")]
pub fn endpoint_event_r_one(id: &str) {}

#[get("/", format = "application/json")]
pub fn endpoint_event_r_many() {}

#[delete("/<id>", format = "application/json")]
pub fn endpoint_event_d(id: &str) {}

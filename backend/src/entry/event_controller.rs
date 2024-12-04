#[post("/appointment")]
pub fn event_appointment_c() {}

#[post("/birthday")]
pub fn event_birthday_c() {}

#[post("/date")]
pub fn event_date_c() {}

#[post("/meeting")]
pub fn event_meeting_c() {}

#[post("/party")]
pub fn event_party_c() {}

#[put("/appointment/<id>")]
pub fn event_appointment_u(id: &str) {}

#[put("/birthday/<id>")]
pub fn event_birthday_u(id: &str) {}

#[put("/date/<id>")]
pub fn event_date_u(id: &str) {}

#[put("/meeting/<id>")]
pub fn event_meeting_u(id: &str) {}

#[put("/party/<id>")]
pub fn event_party_u(id: &str) {}

#[get("/<id>")]
pub fn event_r_one(id: &str) {}

#[get("/")]
pub fn event_r_many() {}

#[delete("/<id>")]
pub fn event_d(id: &str) {}

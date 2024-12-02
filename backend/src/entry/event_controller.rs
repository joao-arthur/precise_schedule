#[post("/APPOINTMENT")]
pub fn event_appointment_c() {}

#[post("/BIRTHDAY")]
pub fn event_birthday_c() {}

#[post("/DATE")]
pub fn event_date_c() {}

#[post("/MEETING")]
pub fn event_meeting_c() {}

#[post("/PARTY")]
pub fn event_party_c() {}

#[put("/APPOINTMENT/<id>")]
pub fn event_appointment_u(id: &str) {}

#[put("/BIRTHDAY/<id>")]
pub fn event_birthday_u(id: &str) {}

#[put("/DATE/<id>")]
pub fn event_date_u(id: &str) {}

#[put("/MEETING/<id>")]
pub fn event_meeting_u(id: &str) {}

#[put("/PARTY/<id>")]
pub fn event_party_u(id: &str) {}

#[get("/<id>")]
pub fn event_r_one(id: &str) {}

#[get("/")]
pub fn event_r_many() {}

#[delete("/<id>")]
pub fn event_d(id: &str) {}

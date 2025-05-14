use crate::schedule::event::model::EventFrequency;

pub struct AppointmentUpdate {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

pub async fn event_appointment_update() {}

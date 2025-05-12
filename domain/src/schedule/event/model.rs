#[derive(Debug, PartialEq, Clone)]
pub enum EventCategory {
    Appointment,
    Birthday,
    Date,
    Meeting,
    Party,
    Travel,
}

#[derive(Debug, PartialEq, Clone)]
pub enum EventFrequency {
    D1,
    D2,
    W1,
    M1,
    M3,
    M6,
    Y1,
    Y2,
}

#[derive(Debug, PartialEq, Clone)]
pub struct Event {
    pub id: String,
    pub name: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
    pub user: String,
    pub created_at: String,
    pub updated_at: String,
}

pub mod stub {
    use super::{Event, EventCategory, EventFrequency};

    pub fn event_stub() -> Event {
        Event {
            id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
            name: "Dentist".into(),
            begin: "2024-03-31T18:00Z".into(),
            end: "2024-03-31T22:00Z".into(),
            category: EventCategory::Appointment,
            frequency: Some(EventFrequency::D2),
            weekend_repeat: Some(true),
            user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            created_at: "2025-02-05T22:49Z".into(),
            updated_at: "2025-04-18T10:23Z".into(),
        }
    }
}

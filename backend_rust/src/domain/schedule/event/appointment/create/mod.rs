use crate::domain::schedule::event::create::EventCreateModel;
use crate::domain::schedule::event::model::EventCategory;
use crate::domain::schedule::event::model::EventFrequency;
use rocket::serde::Deserialize;
use rocket::serde::Serialize;

#[derive(Serialize, Deserialize, Debug)]
#[serde(crate = "rocket::serde")]
pub struct AppointmentCreateModel {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
    pub frequency: Option<String>,
    pub weekend_repeat: Option<bool>,
}

pub fn build_event_create(event: AppointmentCreateModel) -> EventCreateModel {
    EventCreateModel {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: EventCategory::Appointment,
        frequency: if let Some(freq) = event.frequency {
            EventFrequency::parse(freq)
        } else {
            None
        },
        weekend_repeat: event.weekend_repeat,
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::schedule::event::create::EventCreateModel;
    use crate::domain::schedule::event::model::EventCategory;
    use crate::domain::schedule::event::model::EventFrequency;

    #[test]
    fn test_build_event_create() {
        let appointment = AppointmentCreateModel {
            name: "Party".to_owned(),
            day: "2024-03-31".to_owned(),
            begin: "18:00".to_owned(),
            end: "22:00".to_owned(),
            frequency: Some("2D"),
            weekend_repeat: Some(true),
        };
        let create_event = EventCreateModel {
            name: "Party".to_owned(),
            day: "2024-03-31".to_owned(),
            begin: "18:00".to_owned(),
            end: "22:00".to_owned(),
            category: EventCategory::Appointment,
            frequency: Some(EventFrequency::D2),
            weekend_repeat: Some(true),
        };
        assert_eq!(build_event_create(appointment), create_event);
    }
}

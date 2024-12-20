use super::model::{Event, EventCategory, EventFrequency};

#[derive(Debug, PartialEq)]
pub struct EventInfo {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

impl From<Event> for EventInfo {
    fn from(event: Event) -> Self {
        EventInfo {
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: event.category,
            frequency: event.frequency,
            weekend_repeat: event.weekend_repeat,
        }
    }
}

#[cfg(test)]
mod test {
    use crate::domain::schedule::event::stub::{event_info_stub, event_stub};

    use super::*;

    #[test]
    fn test_user_info() {
        assert_eq!(EventInfo::from(event_stub()), event_info_stub());
    }
}

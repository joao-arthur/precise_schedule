use super::model::Event;
use super::model::EventCategory;
use super::model::EventFrequency;

#[derive(Debug, PartialEq)]
pub struct EventCreateModel<'a> {
    pub name: &'a str,
    pub day: &'a str,
    pub begin: &'a str,
    pub end: &'a str,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

pub fn build_event<'a>(event: EventCreateModel<'a>, id: &'a str, user: &'a str) -> Event<'a> {
    Event {
        id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: event.category,
        frequency: event.frequency,
        weekend_repeat: event.weekend_repeat,
        user,
        created_at: "",
        updated_at: "",
    }
}

#[cfg(test)]
mod event_create_test {
    use crate::domain::schedule::event::model::EventCategory;
    use crate::domain::schedule::event::model::EventFrequency;
    use crate::domain::schedule::event::model::Event;
    use super::EventCreateModel;
    use super::build_event;

    #[test]
    fn test_build_event() {
        let create_event = EventCreateModel {
            name: "Party",
            day: "2024-03-31",
            begin: "18:00",
            end: "22:00",
            category: EventCategory::APPOINTMENT,
            frequency: Some(EventFrequency::D2),
            weekend_repeat: Some(true),
        };
        let event = Event {
            id: "12ab-34cd",
            name: "Party",
            day: "2024-03-31",
            begin: "18:00",
            end: "22:00",
            category: EventCategory::APPOINTMENT,
            frequency: Some(EventFrequency::D2),
            weekend_repeat: Some(true),
            user: "ab12-cd34",
            created_at: "",
            updated_at: "",
        };
        assert_eq!(build_event(create_event, "12ab-34cd", "ab12-cd34"), event);
    }
}
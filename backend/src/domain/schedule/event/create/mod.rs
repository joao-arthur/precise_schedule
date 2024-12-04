use super::model::Event;
use super::model::EventCategory;
use super::model::EventFrequency;

#[derive(Debug, PartialEq)]
pub struct EventCreateModel {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

pub fn build_event(event: EventCreateModel, id: String, user: String) -> Event {
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
        created_at: String::from(""),
        updated_at: String::from(""),
    }
}

pub fn event_create(
    repo: EventRepo,
    id_gen: IdGen,
    date_gen: DateGen,
    event: EventCreate,
    //userId: User["id"],
) -> Result<Event, EventCreateErrors> {
    let eventId = id_gen.gen();
    let now = date_gen.gen();
    let built_event = eventCreateToEvent(event, eventId, userId, now);
    let create_result = repo.cCreate(built_event);
    if create_result == "err" {
        return create_result;
    }
    return ok(built_event);
}

#[cfg(test)]
mod test {
    use super::*;
    use crate::domain::schedule::event::model::Event;
    use crate::domain::schedule::event::model::EventCategory;
    use crate::domain::schedule::event::model::EventFrequency;

    #[test]
    fn test_build_event() {
        let create_event = EventCreateModel {
            name: String::from("Party"),
            day: String::from("2024-03-31"),
            begin: String::from("18:00"),
            end: String::from("22:00"),
            category: EventCategory::Appointment,
            frequency: Some(EventFrequency::D2),
            weekend_repeat: Some(true),
        };
        let event = Event {
            id: String::from("12ab-34cd"),
            name: String::from("Party"),
            day: String::from("2024-03-31"),
            begin: String::from("18:00"),
            end: String::from("22:00"),
            category: EventCategory::Appointment,
            frequency: Some(EventFrequency::D2),
            weekend_repeat: Some(true),
            user: String::from("ab12-cd34"),
            created_at: String::from(""),
            updated_at: String::from(""),
        };
        assert_eq!(build_event(create_event, "12ab-34cd", "ab12-cd34"), event);
    }
}

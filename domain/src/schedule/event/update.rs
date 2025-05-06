use crate::generator::DateTimeGenerator;

use super::{
    error::EventErr,
    model::{Event, EventCategory, EventFrequency},
    read::event_read_by_id,
    repository::EventRepository,
};

#[derive(Debug, PartialEq)]
pub struct EventUpdate {
    pub name: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

pub fn event_from_update(event_update: EventUpdate, event: Event, updated_at: String) -> Event {
    Event {
        name: event_update.name,
        begin: event_update.begin,
        end: event_update.end,
        category: event_update.category,
        frequency: event_update.frequency,
        weekend_repeat: event_update.weekend_repeat,
        updated_at,
        ..event
    }
}

pub fn event_update(repository: &dyn EventRepository, date_time_generator: &dyn DateTimeGenerator, event_update: EventUpdate, event_id: String, user_id: String) -> Result<Event, EventErr> {
    let old_event = event_read_by_id(repository, &user_id, &event_id)?;
    let now = date_time_generator.now_as_iso();
    let event = event_from_update(event_update, old_event, now);
    repository.update(&event).map_err(EventErr::DB)?;
    Ok(event)
}

#[cfg(test)]
mod test {
    use super::{event_from_update, event_update};
    use crate::{
        database::DBErr,
        generator::stub::DateTimeGeneratorStub,
        schedule::{
            event::{
                error::EventErr,
                stub::{EventRepositoryStub, event_after_update_stub, event_stub, event_update_stub},
            },
            user::stub::user_stub,
        },
    };

    #[test]
    fn test_event_from_update() {
        assert_eq!(event_from_update(event_update_stub(), event_stub(), event_stub().updated_at), event_after_update_stub());
    }

    #[test]
    fn test_event_update_ok() {
        assert_eq!(
            event_update(
                &EventRepositoryStub::default(),
                &DateTimeGeneratorStub(event_stub().updated_at, 1734555761),
                event_update_stub(),
                user_stub().id,
                event_stub().id
            ),
            Ok(event_after_update_stub())
        );
    }

    #[test]
    fn test_user_update_err() {
        assert_eq!(
            event_update(
                &EventRepositoryStub::of_db_err(),
                &DateTimeGeneratorStub(user_stub().updated_at, 1734555761),
                event_update_stub(),
                user_stub().id,
                event_stub().id
            ),
            Err(EventErr::DB(DBErr))
        );
    }
}

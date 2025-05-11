use crate::generator::{DateTimeGenerator, IdGenerator};

use super::{
    error::EventErr,
    model::{Event, EventCategory, EventFrequency},
    repository::EventRepository,
};

#[derive(Debug, PartialEq)]
pub struct EventCreate {
    pub name: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

pub fn event_of_create(model: EventCreate, id: String, user_id: String, created_at: String) -> Event {
    Event {
        id,
        name: model.name,
        begin: model.begin,
        end: model.end,
        category: model.category,
        frequency: model.frequency,
        weekend_repeat: model.weekend_repeat,
        user: user_id.into(),
        created_at: created_at.clone(),
        updated_at: created_at,
    }
}

pub fn event_create(
    repository: &dyn EventRepository,
    id_generator: &dyn IdGenerator,
    date_time_generator: &dyn DateTimeGenerator,
    model: EventCreate,
    user_id: String,
) -> Result<Event, EventErr> {
    let id = id_generator.generate();
    let now = date_time_generator.now_as_iso();
    let event = event_of_create(model, id, user_id, now);
    repository.create(&event).map_err(EventErr::DB)?;
    Ok(event)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        generator::stub::{DateTimeGeneratorStub, IdGeneratorStub},
        schedule::{
            event::{
                error::EventErr,
                stub::{EventRepositoryStub, event_after_create_stub, event_create_stub, event_stub},
            },
            user::model::stub::user_stub,
        },
    };

    use super::{event_create, event_of_create};

    #[test]
    fn test_event_of_create() {
        assert_eq!(event_of_create(event_create_stub(), event_stub().id, user_stub().id, event_stub().created_at), event_after_create_stub());
    }

    #[test]
    fn event_create_ok() {
        assert_eq!(
            event_create(
                &EventRepositoryStub::default(),
                &IdGeneratorStub(event_stub().id),
                &DateTimeGeneratorStub(event_stub().created_at, 1734555761),
                event_create_stub(),
                user_stub().id
            ),
            Ok(event_after_create_stub())
        );
    }

    #[test]
    fn user_create_err() {
        assert_eq!(
            event_create(
                &EventRepositoryStub::of_db_err(),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub(user_stub().created_at, 1734555761),
                event_create_stub(),
                user_stub().id
            ),
            Err(EventErr::DB(DBErr))
        );
    }
}

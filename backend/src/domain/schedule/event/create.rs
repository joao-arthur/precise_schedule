use crate::domain::generator::{DateGen, IdGen};

use super::{
    error::EventErr,
    model::{Event, EventCategory, EventFrequency},
    repo::EventRepo,
};

#[derive(Debug, PartialEq)]
pub struct EventC {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

pub fn event_from_c(event_c: EventC, id: String, user_id: String, created_at: String) -> Event {
    Event {
        id,
        name: event_c.name,
        day: event_c.day,
        begin: event_c.begin,
        end: event_c.end,
        category: event_c.category,
        frequency: event_c.frequency,
        weekend_repeat: event_c.weekend_repeat,
        user: user_id,
        created_at: created_at.clone(),
        updated_at: created_at,
    }
}

pub fn event_c(
    repo: &dyn EventRepo,
    id_gen: &dyn IdGen,
    date_gen: &dyn DateGen,
    event_c: EventC,
    user_id: String,
) -> Result<Event, EventErr> {
    let id = id_gen.gen();
    let now = date_gen.gen();
    let event = event_from_c(event_c, id, user_id, now);
    repo.c(&event).map_err(EventErr::DB)?;
    Ok(event)
}

#[cfg(test)]
mod test {
    use crate::domain::{database::DBErr, generator::stub::{DateGenStub, IdGenStub}, schedule::{
        event::stub::{event_after_c_stub, event_c_stub, event_stub, EventRepoStub},
        user::stub::user_stub,
    }};

    use super::*;

    #[test]
    fn test_event_from_c() {
        assert_eq!(
            event_from_c(event_c_stub(), event_stub().id, user_stub().id, event_stub().created_at),
            event_after_c_stub()
        );
    }

    #[test]
    fn test_event_c_ok() {
        assert_eq!(
            event_c(
                &EventRepoStub::default(),
                &IdGenStub(event_stub().id),
                &DateGenStub(event_stub().created_at),
                event_c_stub(),
                user_stub().id
            ),
            Ok(event_after_c_stub())
        );
    }

    #[test]
    fn test_user_c_err() {  
        assert_eq!(
            event_c(
                &EventRepoStub::of_db_err(),
                &IdGenStub(user_stub().id),
                &DateGenStub(user_stub().created_at),
                event_c_stub(),
                user_stub().id
            ),
            Err(EventErr::DB(DBErr))
        );
    }

}

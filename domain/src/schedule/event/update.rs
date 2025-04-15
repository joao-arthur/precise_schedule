use crate::generator::DateTimeGen;

use super::{
    error::EventErr,
    model::{Event, EventCat, EventFreq},
    read::event_r_by_id,
    repo::EventRepo,
};

#[derive(Debug, PartialEq)]
pub struct EventU {
    pub name: String,
    pub begin: String,
    pub end: String,
    pub category: EventCat,
    pub frequency: Option<EventFreq>,
    pub weekend_repeat: Option<bool>,
}

pub fn event_from_u(event_u: EventU, event: Event, updated_at: String) -> Event {
    Event {
        name: event_u.name,
        begin: event_u.begin,
        end: event_u.end,
        category: event_u.category,
        frequency: event_u.frequency,
        weekend_repeat: event_u.weekend_repeat,
        updated_at,
        ..event
    }
}

pub fn event_u(repo: &dyn EventRepo, date_time_gen: &dyn DateTimeGen, event_u: EventU, event_id: String, user_id: String) -> Result<Event, EventErr> {
    let old_event = event_r_by_id(repo, &user_id, &event_id)?;
    let now = date_time_gen.now_as_iso();
    let event = event_from_u(event_u, old_event, now);
    repo.u(&event).map_err(EventErr::DB)?;
    Ok(event)
}

#[cfg(test)]
mod test {
    use super::{event_from_u, event_u};
    use crate::{
        database::DBErr,
        generator::stub::DateTimeGenStub,
        schedule::{
            event::{
                error::EventErr,
                stub::{event_after_u_stub, event_stub, event_u_stub, EventRepoStub},
            },
            user::stub::user_stub,
        },
    };

    #[test]
    fn test_event_from_u() {
        assert_eq!(event_from_u(event_u_stub(), event_stub(), event_stub().updated_at), event_after_u_stub());
    }

    #[test]
    fn test_event_u_ok() {
        assert_eq!(
            event_u(
                &EventRepoStub::default(),
                &DateTimeGenStub(event_stub().updated_at, 1734555761),
                event_u_stub(),
                user_stub().id,
                event_stub().id
            ),
            Ok(event_after_u_stub())
        );
    }

    #[test]
    fn test_user_u_err() {
        assert_eq!(
            event_u(
                &EventRepoStub::of_db_err(),
                &DateTimeGenStub(user_stub().updated_at, 1734555761),
                event_u_stub(),
                user_stub().id,
                event_stub().id
            ),
            Err(EventErr::DB(DBErr))
        );
    }
}

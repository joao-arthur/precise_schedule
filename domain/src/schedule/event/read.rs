use super::{
    error::EventErr,
    model::{Event, EventCategory, EventFrequency},
    repository::EventRepository,
};

#[derive(Debug, PartialEq)]
pub struct EventIdNotFoundErr;

#[derive(Debug, PartialEq)]
pub struct EventInfo {
    pub name: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

impl From<Event> for EventInfo {
    fn from(model: Event) -> Self {
        EventInfo {
            name: model.name,
            begin: model.begin,
            end: model.end,
            category: model.category,
            frequency: model.frequency,
            weekend_repeat: model.weekend_repeat,
        }
    }
}

pub fn event_read_by_id(repository: &dyn EventRepository, user_id: &str, id: &str) -> Result<Event, EventErr> {
    repository.read_by_id(user_id, id).map_err(EventErr::DB)?.ok_or(EventErr::EventIdNotFound(EventIdNotFoundErr))
}

pub fn event_read_info_by_id(repository: &dyn EventRepository, user_id: &str, id: &str) -> Result<EventInfo, EventErr> {
    event_read_by_id(repository, user_id, id).map(|e| EventInfo::from(e))
}

pub fn event_read_by_user(repository: &dyn EventRepository, user_id: &str) -> Result<Vec<Event>, EventErr> {
    repository.read_by_user(user_id).map_err(EventErr::DB)
}

pub fn event_read_info_by_user(repository: &dyn EventRepository, user_id: &str) -> Result<Vec<EventInfo>, EventErr> {
    event_read_by_user(repository, user_id).map(|e_vec| e_vec.into_iter().map(|e| EventInfo::from(e)).collect())
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::{
            event::{
                error::EventErr,
                stub::{EventRepositoryStub, event_info_stub, event_stub},
            },
            user::model::stub::user_stub,
        },
    };

    use super::{EventIdNotFoundErr, EventInfo, event_read_by_id, event_read_by_user, event_read_info_by_id, event_read_info_by_user};

    #[test]
    fn event_info() {
        assert_eq!(EventInfo::from(event_stub()), event_info_stub());
    }

    #[test]
    fn event_read_ok() {
        assert_eq!(event_read_by_id(&EventRepositoryStub::of_event(event_stub()), &user_stub().id, &event_stub().id), Ok(event_stub()));
        assert_eq!(event_read_info_by_id(&EventRepositoryStub::of_event(event_stub()), &user_stub().id, &event_stub().id), Ok(event_info_stub()));
        assert_eq!(event_read_by_user(&EventRepositoryStub::of_event(event_stub()), &user_stub().id), Ok(vec![event_stub()]));
        assert_eq!(event_read_info_by_user(&EventRepositoryStub::of_event(event_stub()), &user_stub().id), Ok(vec![event_info_stub()]));
    }

    #[test]
    fn event_read_db_err() {
        assert_eq!(event_read_by_id(&EventRepositoryStub::of_db_err(), &user_stub().id, &event_stub().id), Err(EventErr::DB(DBErr)));
        assert_eq!(event_read_info_by_id(&EventRepositoryStub::of_db_err(), &user_stub().id, &event_stub().id), Err(EventErr::DB(DBErr)));
        assert_eq!(event_read_by_user(&EventRepositoryStub::of_db_err(), &user_stub().id), Err(EventErr::DB(DBErr)));
        assert_eq!(event_read_info_by_user(&EventRepositoryStub::of_db_err(), &user_stub().id), Err(EventErr::DB(DBErr)));
    }

    #[test]
    fn event_read_not_found() {
        assert_eq!(
            event_read_by_id(&EventRepositoryStub::of_none(), &user_stub().id, &event_stub().id),
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
        assert_eq!(
            event_read_info_by_id(&EventRepositoryStub::of_none(), &user_stub().id, &event_stub().id),
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
        assert_eq!(event_read_by_user(&EventRepositoryStub::of_none(), &user_stub().id), Ok(vec![]));
        assert_eq!(event_read_info_by_user(&EventRepositoryStub::of_none(), &user_stub().id), Ok(vec![]));
    }
}

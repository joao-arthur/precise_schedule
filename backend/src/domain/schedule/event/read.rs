use super::{error::EventErr, model::{Event, EventCategory, EventFrequency}, repo::EventRepo};

#[derive(Debug, PartialEq)]
pub struct EventIdNotFoundErr;


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

pub fn event_r_by_id(repo: &dyn EventRepo, user_id: &str, id: &str) -> Result<Event, EventErr> {
    repo.r_by_id(user_id, id).map_err(EventErr::DB)?.ok_or(EventErr::EventIdNotFound(EventIdNotFoundErr))
}

pub fn event_r_info_by_id(repo: &dyn EventRepo, user_id: &str, id: &str) -> Result<EventInfo, EventErr> {
    event_r_by_id(repo, user_id, id).map(|e| EventInfo::from(e))
}

pub fn event_r_by_user(repo: &dyn EventRepo, user_id: &str) -> Result<Vec<Event>, EventErr> {
    repo.r_by_user(user_id).map_err(EventErr::DB)
}

pub fn event_r_info_by_user(repo: &dyn EventRepo, user_id: &str) -> Result<Vec<EventInfo>, EventErr> {
    event_r_by_user(repo, user_id).map(|e_vec| e_vec.into_iter().map(|e| EventInfo::from(e)).collect())
}

#[cfg(test)]
mod test {
    use crate::domain::{
        database::DBErr,
        schedule::{event::stub::{event_info_stub, event_stub, EventRepoStub}, user::stub::user_stub},
    };

    use super::*;


    #[test]
    fn test_event_info() {
        assert_eq!(EventInfo::from(event_stub()), event_info_stub());
    }

    #[test]
    fn test_event_r_ok() {
        assert_eq!(event_r_by_id(&EventRepoStub::default(), &user_stub().id, &event_stub().id), Ok(event_stub()));
        assert_eq!(event_r_info_by_id(&EventRepoStub::default(), &user_stub().id, &event_stub().id), Ok(event_info_stub()));
        assert_eq!(event_r_by_user(&EventRepoStub::default(), &user_stub().id), Ok(vec![event_stub()]));
        assert_eq!(event_r_info_by_user(&EventRepoStub::default(), &user_stub().id), Ok(vec![event_info_stub()]));
    }

    #[test]
    fn test_event_r_db_err() {
        assert_eq!(event_r_by_id(&EventRepoStub::of_db_err(), &user_stub().id, &event_stub().id), Err(EventErr::DB(DBErr)));
        assert_eq!(event_r_info_by_id(&EventRepoStub::of_db_err(), &user_stub().id, &event_stub().id), Err(EventErr::DB(DBErr)));
        assert_eq!(event_r_by_user(&EventRepoStub::of_db_err(), &user_stub().id), Err(EventErr::DB(DBErr)));
        assert_eq!(event_r_info_by_user(&EventRepoStub::of_db_err(), &user_stub().id), Err(EventErr::DB(DBErr)));
    }

    #[test]
    fn test_event_r_not_found() {
        assert_eq!(event_r_by_id(&EventRepoStub::of_none(), &user_stub().id, &event_stub().id), Err(EventErr::EventIdNotFound(EventIdNotFoundErr)));
        assert_eq!(event_r_info_by_id(&EventRepoStub::of_none(), &user_stub().id, &event_stub().id), Err(EventErr::EventIdNotFound(EventIdNotFoundErr)));
        assert_eq!(event_r_by_user(&EventRepoStub::of_none(), &user_stub().id), Ok(vec![]));
        assert_eq!(event_r_info_by_user(&EventRepoStub::of_none(), &user_stub().id), Ok(vec![]));

    }
}

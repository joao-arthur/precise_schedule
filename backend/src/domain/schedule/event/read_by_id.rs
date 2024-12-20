use super::{error::EventErr, model::Event, read_info::EventInfo, repo::EventRepo};

#[derive(Debug, PartialEq)]
pub struct EventIdNotFoundErr;

pub fn event_r_by_id(repo: &dyn EventRepo, id: &str) -> Result<Event, EventErr> {
    let user = repo.r_by_id(id).map_err(EventErr::DB)?;
    user.ok_or(EventErr::EventIdNotFound(EventIdNotFoundErr))
}

pub fn event_r_info_by_id(repo: &dyn EventRepo, id: &str) -> Result<EventInfo, EventErr> {
    event_r_by_id(repo, id).and_then(|e| Ok(EventInfo::from(e)))
}

#[cfg(test)]
mod test {
    use crate::domain::{
        database::DBErr,
        schedule::event::stub::{event_info_stub, event_stub, EventRepoStub},
    };

    use super::*;

    #[test]
    fn test_r_by_id_ok() {
        assert_eq!(event_r_by_id(&EventRepoStub::default(), &event_stub().id), Ok(event_stub()));
    }

    #[test]
    fn test_r_by_id_err() {
        assert_eq!(
            event_r_by_id(&EventRepoStub::of_db_err(), &event_stub().id),
            Err(EventErr::DB(DBErr))
        );
        assert_eq!(
            event_r_by_id(&EventRepoStub::of_none(), &event_stub().id),
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
    }

    #[test]
    fn test_event_r_info_by_id_ok() {
        assert_eq!(
            event_r_info_by_id(&EventRepoStub::default(), &event_stub().id),
            Ok(event_info_stub())
        );
    }

    #[test]
    fn test_event_r_info_by_id_err() {
        assert_eq!(
            event_r_info_by_id(&EventRepoStub::of_db_err(), &event_stub().id),
            Err(EventErr::DB(DBErr))
        );
        assert_eq!(
            event_r_info_by_id(&EventRepoStub::of_none(), &event_stub().id),
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
    }
}

use super::{error::EventErr, model::Event, read::event_read_by_id, repository::EventRepo};

pub fn event_delete(repository: &dyn EventRepo, user_id: &str, id: &str) -> Result<Event, EventErr> {
    let found_event = event_read_by_id(repository, &user_id, &id)?;
    repository.delete(&found_event.id).map_err(EventErr::DB)?;
    Ok(found_event)
}

#[cfg(test)]
mod test {
    use super::event_delete;
    use crate::{
        database::DBErr,
        schedule::{
            event::{
                error::EventErr,
                read::EventIdNotFoundErr,
                stub::{EventRepoStub, event_stub},
            },
            user::stub::user_stub,
        },
    };

    #[test]
    fn test_event_delete_ok() {
        assert_eq!(event_delete(&EventRepoStub::default(), &user_stub().id, &event_stub().id), Ok(event_stub()));
    }

    #[test]
    fn test_event_delete_err() {
        assert_eq!(event_delete(&EventRepoStub::of_db_err(), &user_stub().id, &event_stub().id), Err(EventErr::DB(DBErr)));
        assert_eq!(event_delete(&EventRepoStub::of_none(), &user_stub().id, &event_stub().id), Err(EventErr::EventIdNotFound(EventIdNotFoundErr)));
    }
}

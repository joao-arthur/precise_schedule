use super::{error::EventErr, model::Event, read::event_read_by_id, repository::EventRepository};

pub fn event_delete(repository: &dyn EventRepository, user_id: &str, id: &str) -> Result<Event, EventErr> {
    let found_event = event_read_by_id(repository, &user_id, &id)?;
    repository.delete(&found_event.id).map_err(EventErr::DB)?;
    Ok(found_event)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::{
            event::{
                error::EventErr,
                read::EventIdNotFoundErr,
                stub::{EventRepositoryStub, event_stub},
            },
            user::model::stub::user_stub,
        },
    };

    use super::event_delete;

    #[test]
    fn event_delete_ok() {
        assert_eq!(event_delete(&EventRepositoryStub::of_event(event_stub()), &user_stub().id, &event_stub().id), Ok(event_stub()));
    }

    #[test]
    fn event_delete_err() {
        assert_eq!(event_delete(&EventRepositoryStub::of_db_err(), &user_stub().id, &event_stub().id), Err(EventErr::DB(DBErr)));
        assert_eq!(
            event_delete(&EventRepositoryStub::of_none(), &user_stub().id, &event_stub().id),
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
    }
}

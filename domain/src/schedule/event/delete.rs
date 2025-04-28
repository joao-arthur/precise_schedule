use super::{error::EventErr, model::Event, read::event_r_by_id, repo::EventRepo};

pub fn event_d(repo: &dyn EventRepo, user_id: &str, id: &str) -> Result<Event, EventErr> {
    let found_event = event_r_by_id(repo, &user_id, &id)?;
    repo.d(&found_event.id).map_err(EventErr::DB)?;
    Ok(found_event)
}

#[cfg(test)]
mod test {
    use super::event_d;
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
    fn test_event_d_ok() {
        assert_eq!(event_d(&EventRepoStub::default(), &user_stub().id, &event_stub().id), Ok(event_stub()));
    }

    #[test]
    fn test_event_d_err() {
        assert_eq!(event_d(&EventRepoStub::of_db_err(), &user_stub().id, &event_stub().id), Err(EventErr::DB(DBErr)));
        assert_eq!(event_d(&EventRepoStub::of_none(), &user_stub().id, &event_stub().id), Err(EventErr::EventIdNotFound(EventIdNotFoundErr)));
    }
}

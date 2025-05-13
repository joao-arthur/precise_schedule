use crate::database::DBOp;

use super::model::Event;

pub trait EventRepository {
    fn create(&self, event: &Event) -> DBOp<()>;
    fn update(&self, event: &Event) -> DBOp<()>;
    fn delete(&self, id: &str) -> DBOp<()>;
    fn read_by_id(&self, user_id: &str, id: &str) -> DBOp<Option<Event>>;
    fn read_by_user(&self, user_id: &str) -> DBOp<Vec<Event>>;
}

pub mod stub {
    use crate::{
        database::{DBErr, DBOp},
        schedule::event::model::Event,
    };

    use super::EventRepository;

    pub struct EventRepositoryStub {
        err: bool,
        event: Option<Event>,
    }

    impl EventRepository for EventRepositoryStub {
        fn create(&self, _: &Event) -> DBOp<()> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        fn update(&self, _: &Event) -> DBOp<()> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        fn delete(&self, _: &str) -> DBOp<()> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        fn read_by_id(&self, _: &str, __: &str) -> DBOp<Option<Event>> {
            if self.err {
                return Err(DBErr);
            }
            Ok(self.event.clone())
        }

        fn read_by_user(&self, _: &str) -> DBOp<Vec<Event>> {
            if self.err {
                return Err(DBErr);
            }
            Ok(vec![self.event.clone()].into_iter().flatten().collect())
        }
    }

    impl EventRepositoryStub {
        pub fn of_event(event: Event) -> Self {
            EventRepositoryStub { err: false, event: Some(event) }
        }

        pub fn of_db_err() -> Self {
            EventRepositoryStub { err: true, event: None }
        }

        pub fn of_none() -> Self {
            EventRepositoryStub { err: false, event: None }
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::{
            event::{
                model::stub::event_stub,
                repository::{EventRepository, stub::EventRepositoryStub},
            },
            user::model::stub::user_stub,
        },
    };

    #[test]
    fn event_repo_stub_default() {
        assert_eq!(EventRepositoryStub::of_none().create(&event_stub()), Ok(()));
        assert_eq!(EventRepositoryStub::of_none().update(&event_stub()), Ok(()));
        assert_eq!(EventRepositoryStub::of_none().delete(&event_stub().id), Ok(()));
        assert_eq!(
            EventRepositoryStub::of_none().read_by_id(&user_stub().id, &event_stub().id),
            Ok(None)
        );
    }

    #[test]
    fn event_repo_stub_of_event() {
        assert_eq!(
            EventRepositoryStub::of_event(event_stub())
                .read_by_id(&user_stub().id, &event_stub().id),
            Ok(Some(event_stub()))
        );
    }

    #[test]
    fn event_repo_stub_of_bd_err() {
        assert_eq!(EventRepositoryStub::of_db_err().create(&event_stub()), Err(DBErr));
        assert_eq!(EventRepositoryStub::of_db_err().update(&event_stub()), Err(DBErr));
        assert_eq!(EventRepositoryStub::of_db_err().delete(&event_stub().id), Err(DBErr));
        assert_eq!(
            EventRepositoryStub::of_db_err().read_by_id(&user_stub().id, &event_stub().id),
            Err(DBErr)
        );
    }
}

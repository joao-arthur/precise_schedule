use crate::database::DBOp;

use super::model::Event;

pub trait EventRepository {
    async fn create(&self, event: &Event) -> DBOp<()>;
    async fn update(&self, event: &Event) -> DBOp<()>;
    async fn delete(&self, id: &str) -> DBOp<()>;
    async fn read_by_id(&self, user_id: &str, id: &str) -> DBOp<Option<Event>>;
    async fn read_by_user(&self, user_id: &str) -> DBOp<Vec<Event>>;
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
        async fn create(&self, _: &Event) -> DBOp<()> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn update(&self, _: &Event) -> DBOp<()> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn delete(&self, _: &str) -> DBOp<()> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn read_by_id(&self, _: &str, __: &str) -> DBOp<Option<Event>> {
            if self.err {
                return Err(DBErr);
            }
            Ok(self.event.clone())
        }

        async fn read_by_user(&self, _: &str) -> DBOp<Vec<Event>> {
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

    #[tokio::test]
    async fn event_repo_stub_default() {
        assert_eq!(EventRepositoryStub::of_none().create(&event_stub()).await, Ok(()));
        assert_eq!(EventRepositoryStub::of_none().update(&event_stub()).await, Ok(()));
        assert_eq!(EventRepositoryStub::of_none().delete(&event_stub().id).await, Ok(()));
        assert_eq!(
            EventRepositoryStub::of_none().read_by_id(&user_stub().id, &event_stub().id).await,
            Ok(None)
        );
    }

    #[tokio::test]
    async fn event_repo_stub_of_event() {
        assert_eq!(
            EventRepositoryStub::of_event(event_stub())
                .read_by_id(&user_stub().id, &event_stub().id)
                .await,
            Ok(Some(event_stub()))
        );
    }

    #[tokio::test]
    async fn event_repo_stub_of_bd_err() {
        assert_eq!(EventRepositoryStub::of_db_err().create(&event_stub()).await, Err(DBErr));
        assert_eq!(EventRepositoryStub::of_db_err().update(&event_stub()).await, Err(DBErr));
        assert_eq!(EventRepositoryStub::of_db_err().delete(&event_stub().id).await, Err(DBErr));
        assert_eq!(
            EventRepositoryStub::of_db_err().read_by_id(&user_stub().id, &event_stub().id).await,
            Err(DBErr)
        );
    }
}

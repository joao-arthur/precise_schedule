use crate::database::DBErr;

use super::model::Event;

pub trait EventRepository {
    async fn create(&self, event: &Event) -> Result<(), DBErr>;
    async fn update(&self, event: &Event) -> Result<(), DBErr>;
    async fn delete(&self, id: &str) -> Result<(), DBErr>;
    async fn read_by_id(&self, user_id: &str, id: &str) -> Result<Option<Event>, DBErr>;
    async fn read_by_user(&self, user_id: &str) -> Result<Vec<Event>, DBErr>;
}

pub mod stub {
    use crate::{database::DBErr, schedule::event::model::Event};

    use super::EventRepository;

    pub struct EventRepositoryStub {
        err: bool,
        event: Option<Event>,
    }

    impl EventRepository for EventRepositoryStub {
        async fn create(&self, _: &Event) -> Result<(), DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn update(&self, _: &Event) -> Result<(), DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn delete(&self, _: &str) -> Result<(), DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(())
        }

        async fn read_by_id(&self, _: &str, __: &str) -> Result<Option<Event>, DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(self.event.clone())
        }

        async fn read_by_user(&self, _: &str) -> Result<Vec<Event>, DBErr> {
            if self.err {
                return Err(DBErr);
            }
            Ok(vec![self.event.clone()].into_iter().flatten().collect())
        }
    }

    impl EventRepositoryStub {
        pub fn of_empty() -> Self {
            EventRepositoryStub { err: false, event: None }
        }

        pub fn of_event(event: Event) -> Self {
            EventRepositoryStub { err: false, event: Some(event) }
        }

        pub fn of_db_err() -> Self {
            EventRepositoryStub { err: true, event: None }
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
        let repo = EventRepositoryStub::of_empty();
        assert_eq!(repo.create(&event_stub()).await, Ok(()));
        assert_eq!(repo.update(&event_stub()).await, Ok(()));
        assert_eq!(repo.delete(&event_stub().id).await, Ok(()));
        assert_eq!(repo.read_by_id(&user_stub().id, &event_stub().id).await, Ok(None));
    }

    #[tokio::test]
    async fn event_repo_stub_of_event() {
        let repo = EventRepositoryStub::of_event(event_stub());
        assert_eq!(
            repo.read_by_id(&user_stub().id, &event_stub().id).await,
            Ok(Some(event_stub()))
        );
    }

    #[tokio::test]
    async fn event_repo_stub_of_bd_err() {
        let repo = EventRepositoryStub::of_db_err();
        assert_eq!(repo.create(&event_stub()).await, Err(DBErr));
        assert_eq!(repo.update(&event_stub()).await, Err(DBErr));
        assert_eq!(repo.delete(&event_stub().id).await, Err(DBErr));
        assert_eq!(repo.read_by_id(&user_stub().id, &event_stub().id).await, Err(DBErr));
    }
}

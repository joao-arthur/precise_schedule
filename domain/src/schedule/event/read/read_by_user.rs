use crate::schedule::event::{error::EventErr, model::Event, repository::EventRepository};

pub async fn event_read_by_user<Repo: EventRepository>(
    repository: &Repo,
    user_id: &str,
) -> Result<Vec<Event>, EventErr> {
    repository.read_by_user(user_id).await.map_err(EventErr::DB)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::{
            event::{
                error::EventErr, model::stub::event_stub, repository::stub::EventRepositoryStub,
            },
            user::model::stub::user_stub,
        },
    };

    use super::event_read_by_user;

    #[tokio::test]
    async fn event_read_by_user_ok() {
        assert_eq!(
            event_read_by_user(&EventRepositoryStub::of_event(event_stub()), &user_stub().id).await,
            Ok(vec![event_stub()])
        );
    }

    #[tokio::test]
    async fn event_read_by_user_db_err() {
        assert_eq!(
            event_read_by_user(&EventRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(EventErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn event_read_by_user_not_found() {
        assert_eq!(
            event_read_by_user(&EventRepositoryStub::of_empty(), &user_stub().id).await,
            Ok(vec![])
        );
    }
}

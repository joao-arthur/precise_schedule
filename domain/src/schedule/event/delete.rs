use super::{error::EventErr, model::Event, read::event_read_by_id, repository::EventRepository};

pub async fn event_delete<Repo: EventRepository>(
    repository: &Repo,
    user_id: &str,
    id: &str,
) -> Result<Event, EventErr> {
    let found_event = event_read_by_id(repository, user_id, id).await?;
    repository.delete(&found_event.id).await.map_err(EventErr::DB)?;
    Ok(found_event)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::{
            event::{
                error::EventErr, model::stub::event_stub, read::EventIdNotFoundErr,
                repository::stub::EventRepositoryStub,
            },
            user::model::stub::user_stub,
        },
    };

    use super::event_delete;

    #[tokio::test]
    async fn event_delete_ok() {
        assert_eq!(
            event_delete(
                &EventRepositoryStub::of_event(event_stub()),
                &user_stub().id,
                &event_stub().id
            )
            .await,
            Ok(event_stub())
        );
    }

    #[tokio::test]
    async fn event_delete_db_err() {
        assert_eq!(
            event_delete(&EventRepositoryStub::of_db_err(), &user_stub().id, &event_stub().id)
                .await,
            Err(EventErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn event_delete_event_id_not_found_err() {
        assert_eq!(
            event_delete(&EventRepositoryStub::of_none(), &user_stub().id, &event_stub().id).await,
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
    }
}

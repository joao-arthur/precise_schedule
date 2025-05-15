use crate::schedule::event::{
    error::{EventErr, EventIdNotFoundErr},
    model::Event,
    repository::EventRepository,
};

pub async fn event_read_by_id<Repo: EventRepository>(
    repository: &Repo,
    user_id: &str,
    id: &str,
) -> Result<Event, EventErr> {
    repository
        .read_by_id(user_id, id)
        .await
        .map_err(EventErr::DB)?
        .ok_or(EventErr::EventIdNotFound(EventIdNotFoundErr))
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::{
            event::{
                error::{EventErr, EventIdNotFoundErr},
                model::stub::event_stub,
                repository::stub::EventRepositoryStub,
            },
            user::model::stub::user_stub,
        },
    };

    use super::event_read_by_id;

    #[tokio::test]
    async fn event_read_by_id_ok() {
        assert_eq!(
            event_read_by_id(
                &EventRepositoryStub::of_event(event_stub()),
                &user_stub().id,
                &event_stub().id
            )
            .await,
            Ok(event_stub())
        );
    }

    #[tokio::test]
    async fn event_read_by_id_db_err() {
        assert_eq!(
            event_read_by_id(&EventRepositoryStub::of_db_err(), &user_stub().id, &event_stub().id)
                .await,
            Err(EventErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn event_read_by_id_not_found() {
        assert_eq!(
            event_read_by_id(&EventRepositoryStub::of_empty(), &user_stub().id, &event_stub().id)
                .await,
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
    }
}

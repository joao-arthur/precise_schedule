use crate::schedule::event::{error::EventErr, model::EventInfo, repository::EventRepository};

use super::event_read_by_id;

pub async fn event_read_info_by_id<Repo: EventRepository>(
    repository: &Repo,
    user_id: &str,
    id: &str,
) -> Result<EventInfo, EventErr> {
    event_read_by_id(repository, user_id, id).await.map(EventInfo::from)
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::{
            event::{
                error::{EventErr, EventIdNotFoundErr},
                model::stub::{event_info_stub, event_stub},
                repository::stub::EventRepositoryStub,
            },
            user::model::stub::user_stub,
        },
    };

    use super::event_read_info_by_id;

    #[tokio::test]
    async fn event_read_info_by_id_ok() {
        assert_eq!(
            event_read_info_by_id(
                &EventRepositoryStub::of_event(event_stub()),
                &user_stub().id,
                &event_stub().id
            )
            .await,
            Ok(event_info_stub())
        );
    }

    #[tokio::test]
    async fn event_read_info_by_id_db_err() {
        assert_eq!(
            event_read_info_by_id(
                &EventRepositoryStub::of_db_err(),
                &user_stub().id,
                &event_stub().id
            )
            .await,
            Err(EventErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn event_read_info_by_id_not_found() {
        assert_eq!(
            event_read_info_by_id(
                &EventRepositoryStub::of_none(),
                &user_stub().id,
                &event_stub().id
            )
            .await,
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
    }
}

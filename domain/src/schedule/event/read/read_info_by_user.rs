use crate::schedule::event::{error::EventErr, model::EventInfo, repository::EventRepository};

use super::event_read_by_user;

pub async fn event_read_info_by_user<Repo: EventRepository>(
    repository: &Repo,
    user_id: &str,
) -> Result<Vec<EventInfo>, EventErr> {
    event_read_by_user(repository, user_id)
        .await
        .map(|e_vec| e_vec.into_iter().map(EventInfo::from).collect())
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::{
            event::{
                error::EventErr,
                model::stub::{event_info_stub, event_stub},
                repository::stub::EventRepositoryStub,
            },
            user::model::stub::user_stub,
        },
    };

    use super::event_read_info_by_user;

    #[tokio::test]
    async fn event_read_ok() {
        assert_eq!(
            event_read_info_by_user(&EventRepositoryStub::of_event(event_stub()), &user_stub().id)
                .await,
            Ok(vec![event_info_stub()])
        );
    }

    #[tokio::test]
    async fn event_read_db_err() {
        assert_eq!(
            event_read_info_by_user(&EventRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(EventErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn event_read_not_found() {
        assert_eq!(
            event_read_info_by_user(&EventRepositoryStub::of_empty(), &user_stub().id).await,
            Ok(vec![])
        );
    }
}

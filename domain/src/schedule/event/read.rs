use super::{
    error::EventErr,
    model::{Event, EventCategory, EventFrequency},
    repository::EventRepository,
};

#[derive(Debug, PartialEq)]
pub struct EventIdNotFoundErr;

#[derive(Debug, PartialEq)]
pub struct EventInfo {
    pub name: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

impl From<Event> for EventInfo {
    fn from(model: Event) -> Self {
        EventInfo {
            name: model.name,
            begin: model.begin,
            end: model.end,
            category: model.category,
            frequency: model.frequency,
            weekend_repeat: model.weekend_repeat,
        }
    }
}

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

pub async fn event_read_info_by_id<Repo: EventRepository>(
    repository: &Repo,
    user_id: &str,
    id: &str,
) -> Result<EventInfo, EventErr> {
    event_read_by_id(repository, user_id, id).await.map(EventInfo::from)
}

pub async fn event_read_by_user<Repo: EventRepository>(
    repository: &Repo,
    user_id: &str,
) -> Result<Vec<Event>, EventErr> {
    repository.read_by_user(user_id).await.map_err(EventErr::DB)
}

pub async fn event_read_info_by_user<Repo: EventRepository>(
    repository: &Repo,
    user_id: &str,
) -> Result<Vec<EventInfo>, EventErr> {
    event_read_by_user(repository, user_id)
        .await
        .map(|e_vec| e_vec.into_iter().map(EventInfo::from).collect())
}

mod stub {
    use crate::schedule::event::model::{EventCategory, EventFrequency};

    use super::EventInfo;

    pub fn event_info_stub() -> EventInfo {
        EventInfo {
            name: "Dentist".into(),
            begin: "2024-03-31T18:00Z".into(),
            end: "2024-03-31T22:00Z".into(),
            category: EventCategory::Appointment,
            frequency: Some(EventFrequency::D2),
            weekend_repeat: Some(true),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::{
            event::{
                error::EventErr, model::stub::event_stub, read::stub::event_info_stub,
                repository::stub::EventRepositoryStub,
            },
            user::model::stub::user_stub,
        },
    };

    use super::{
        EventIdNotFoundErr, EventInfo, event_read_by_id, event_read_by_user, event_read_info_by_id,
        event_read_info_by_user,
    };

    #[test]
    fn event_info() {
        assert_eq!(EventInfo::from(event_stub()), event_info_stub());
    }

    #[tokio::test]
    async fn event_read_ok() {
        assert_eq!(
            event_read_by_id(
                &EventRepositoryStub::of_event(event_stub()),
                &user_stub().id,
                &event_stub().id
            )
            .await,
            Ok(event_stub())
        );
        assert_eq!(
            event_read_info_by_id(
                &EventRepositoryStub::of_event(event_stub()),
                &user_stub().id,
                &event_stub().id
            )
            .await,
            Ok(event_info_stub())
        );
        assert_eq!(
            event_read_by_user(&EventRepositoryStub::of_event(event_stub()), &user_stub().id).await,
            Ok(vec![event_stub()])
        );
        assert_eq!(
            event_read_info_by_user(&EventRepositoryStub::of_event(event_stub()), &user_stub().id)
                .await,
            Ok(vec![event_info_stub()])
        );
    }

    #[tokio::test]
    async fn event_read_db_err() {
        assert_eq!(
            event_read_by_id(&EventRepositoryStub::of_db_err(), &user_stub().id, &event_stub().id)
                .await,
            Err(EventErr::DB(DBErr))
        );
        assert_eq!(
            event_read_info_by_id(
                &EventRepositoryStub::of_db_err(),
                &user_stub().id,
                &event_stub().id
            )
            .await,
            Err(EventErr::DB(DBErr))
        );
        assert_eq!(
            event_read_by_user(&EventRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(EventErr::DB(DBErr))
        );
        assert_eq!(
            event_read_info_by_user(&EventRepositoryStub::of_db_err(), &user_stub().id).await,
            Err(EventErr::DB(DBErr))
        );
    }

    #[tokio::test]
    async fn event_read_not_found() {
        assert_eq!(
            event_read_by_id(&EventRepositoryStub::of_none(), &user_stub().id, &event_stub().id)
                .await,
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
        assert_eq!(
            event_read_info_by_id(
                &EventRepositoryStub::of_none(),
                &user_stub().id,
                &event_stub().id
            )
            .await,
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
        assert_eq!(
            event_read_by_user(&EventRepositoryStub::of_none(), &user_stub().id).await,
            Ok(vec![])
        );
        assert_eq!(
            event_read_info_by_user(&EventRepositoryStub::of_none(), &user_stub().id).await,
            Ok(vec![])
        );
    }
}

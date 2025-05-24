use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    session::Session,
};

use super::{
    error::EventErr,
    model::{Event, EventCategory, EventFrequency},
    repository::EventRepository,
};

#[derive(Debug, PartialEq)]
pub struct EventCreateInput {
    pub name: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

pub fn transform_to_event(
    model: EventCreateInput,
    id: String,
    user_id: String,
    created_at: String,
) -> Event {
    Event {
        id,
        name: model.name,
        begin: model.begin,
        end: model.end,
        category: model.category,
        frequency: model.frequency,
        weekend_repeat: model.weekend_repeat,
        user: user_id,
        created_at: created_at.clone(),
        updated_at: created_at,
    }
}

pub async fn event_create<Repo: EventRepository, IdGen: IdGenerator, DtTmGen: DateTimeGenerator>(
    session: &Session,
    repository: &Repo,
    id_generator: &IdGen,
    date_time_generator: &DtTmGen,
    model: EventCreateInput,
) -> Result<Event, EventErr> {
    let id = id_generator.generate();
    let now = date_time_generator.now_as_iso();
    let event = transform_to_event(model, id, session.id.clone(), now);
    repository.create(&event).await.map_err(EventErr::DB)?;
    Ok(event)
}

mod stubs {
    use crate::schedule::event::model::{EventCategory, EventFrequency};

    use super::EventCreateInput;

    pub fn event_create_stub() -> EventCreateInput {
        EventCreateInput {
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
        generator::stub::{DateTimeGeneratorStub, IdGeneratorStub},
        schedule::{
            event::{
                create::{EventCreateInput, stubs::event_create_stub},
                error::EventErr,
                model::{Event, EventCategory, EventFrequency, stub::event_stub},
                repository::stub::EventRepositoryStub,
            },
            user::model::stub::user_stub,
        },
        session::{Session, stub::session_stub},
    };

    use super::{event_create, transform_to_event};

    #[test]
    fn test_transform_to_event() {
        assert_eq!(
            transform_to_event(
                EventCreateInput {
                    name: "Dentist".into(),
                    begin: "2024-03-31T18:00Z".into(),
                    end: "2024-03-31T22:00Z".into(),
                    category: EventCategory::Appointment,
                    frequency: Some(EventFrequency::D2),
                    weekend_repeat: Some(true),
                },
                "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                "2025-02-05T22:49Z".into()
            ),
            Event {
                id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                name: "Dentist".into(),
                begin: "2024-03-31T18:00Z".into(),
                end: "2024-03-31T22:00Z".into(),
                category: EventCategory::Appointment,
                frequency: Some(EventFrequency::D2),
                weekend_repeat: Some(true),
                user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                created_at: "2025-02-05T22:49Z".into(),
                updated_at: "2025-02-05T22:49Z".into(),
            }
        );
    }

    #[tokio::test]
    async fn event_create_ok() {
        let session = Session {
            id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            username: "username".into(),
        };
        assert_eq!(
            event_create(
                &session,
                &EventRepositoryStub::of_empty(),
                &IdGeneratorStub(event_stub().id),
                &DateTimeGeneratorStub::of_iso("2025-02-05T22:49Z".into()),
                EventCreateInput {
                    name: "Dentist".into(),
                    begin: "2024-03-31T18:00Z".into(),
                    end: "2024-03-31T22:00Z".into(),
                    category: EventCategory::Appointment,
                    frequency: Some(EventFrequency::D2),
                    weekend_repeat: Some(true),
                },
            )
            .await,
            Ok(Event {
                id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                name: "Dentist".into(),
                begin: "2024-03-31T18:00Z".into(),
                end: "2024-03-31T22:00Z".into(),
                category: EventCategory::Appointment,
                frequency: Some(EventFrequency::D2),
                weekend_repeat: Some(true),
                user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                created_at: "2025-02-05T22:49Z".into(),
                updated_at: "2025-02-05T22:49Z".into(),
            })
        );
    }

    #[tokio::test]
    async fn user_create_db_err() {
        assert_eq!(
            event_create(
                &session_stub(),
                &EventRepositoryStub::of_db_err(),
                &IdGeneratorStub(user_stub().id),
                &DateTimeGeneratorStub::of_iso(user_stub().created_at),
                event_create_stub(),
            )
            .await,
            Err(EventErr::DB(DBErr))
        );
    }
}

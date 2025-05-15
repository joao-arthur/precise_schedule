use crate::generator::DateTimeGenerator;

use super::{
    error::EventErr,
    model::{Event, EventCategory, EventFrequency},
    read::event_read_by_id,
    repository::EventRepository,
};

#[derive(Debug, PartialEq)]
pub struct EventUpdateInput {
    pub name: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

fn transform_to_event(model: EventUpdateInput, event: Event, updated_at: String) -> Event {
    Event {
        name: model.name,
        begin: model.begin,
        end: model.end,
        category: model.category,
        frequency: model.frequency,
        weekend_repeat: model.weekend_repeat,
        updated_at,
        ..event
    }
}

pub async fn event_update<Repo: EventRepository, DtTmGen: DateTimeGenerator>(
    repository: &Repo,
    date_time_generator: &DtTmGen,
    event_update: EventUpdateInput,
    event_id: String,
    user_id: String,
) -> Result<Event, EventErr> {
    let old_event = event_read_by_id(repository, &user_id, &event_id).await?;
    let now = date_time_generator.now_as_iso();
    let event = transform_to_event(event_update, old_event, now);
    repository.update(&event).await.map_err(EventErr::DB)?;
    Ok(event)
}

mod stub {
    use crate::schedule::event::model::{EventCategory, EventFrequency};

    use super::EventUpdateInput;

    pub fn event_update_stub() -> EventUpdateInput {
        EventUpdateInput {
            name: "Medical physicist".into(),
            begin: "2025-08-11T10:00Z".into(),
            end: "2025-08-11T11:00Z".into(),
            category: EventCategory::Appointment,
            frequency: Some(EventFrequency::Y1),
            weekend_repeat: None,
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        generator::stub::DateTimeGeneratorStub,
        schedule::{
            event::{
                error::{EventErr, EventIdNotFoundErr},
                model::{Event, EventCategory, EventFrequency, stub::event_stub},
                repository::stub::EventRepositoryStub,
                update::{EventUpdateInput, stub::event_update_stub},
            },
            user::model::stub::user_stub,
        },
    };

    use super::{event_update, transform_to_event};

    #[test]
    fn test_transform_to_event() {
        assert_eq!(
            transform_to_event(
                EventUpdateInput {
                    name: "Medical physicist".into(),
                    begin: "2025-08-11T10:00Z".into(),
                    end: "2025-08-11T11:00Z".into(),
                    category: EventCategory::Appointment,
                    frequency: Some(EventFrequency::Y1),
                    weekend_repeat: None,
                },
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
                },
                "2025-04-18T10:23Z".into()
            ),
            Event {
                id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                name: "Medical physicist".into(),
                begin: "2025-08-11T10:00Z".into(),
                end: "2025-08-11T11:00Z".into(),
                category: EventCategory::Appointment,
                frequency: Some(EventFrequency::Y1),
                weekend_repeat: None,
                user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                created_at: "2025-02-05T22:49Z".into(),
                updated_at: "2025-04-18T10:23Z".into(),
            }
        );
    }

    #[tokio::test]
    async fn event_update_ok() {
        assert_eq!(
            event_update(
                &EventRepositoryStub::of_event(Event {
                    id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                    name: "Dentist".into(),
                    begin: "2024-03-31T18:00Z".into(),
                    end: "2024-03-31T22:00Z".into(),
                    category: EventCategory::Appointment,
                    frequency: Some(EventFrequency::D2),
                    weekend_repeat: Some(true),
                    user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                    created_at: "2025-02-05T22:49Z".into(),
                    updated_at: "2025-04-18T10:23Z".into(),
                }),
                &DateTimeGeneratorStub::of_iso("2025-04-18T10:23Z".into()),
                EventUpdateInput {
                    name: "Medical physicist".into(),
                    begin: "2025-08-11T10:00Z".into(),
                    end: "2025-08-11T11:00Z".into(),
                    category: EventCategory::Appointment,
                    frequency: Some(EventFrequency::Y1),
                    weekend_repeat: None,
                },
                "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
            )
            .await,
            Ok(Event {
                id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                name: "Medical physicist".into(),
                begin: "2025-08-11T10:00Z".into(),
                end: "2025-08-11T11:00Z".into(),
                category: EventCategory::Appointment,
                frequency: Some(EventFrequency::Y1),
                weekend_repeat: None,
                user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                created_at: "2025-02-05T22:49Z".into(),
                updated_at: "2025-04-18T10:23Z".into(),
            })
        );
    }

    #[tokio::test]
    async fn user_update_refgedb_err() {
        assert_eq!(
            event_update(
                &EventRepositoryStub::of_empty(),
                &DateTimeGeneratorStub::of_iso(user_stub().updated_at),
                event_update_stub(),
                user_stub().id,
                event_stub().id
            )
            .await,
            Err(EventErr::EventIdNotFound(EventIdNotFoundErr))
        );
    }

    #[tokio::test]
    async fn user_update_db_err() {
        assert_eq!(
            event_update(
                &EventRepositoryStub::of_db_err(),
                &DateTimeGeneratorStub::of_iso(user_stub().updated_at),
                event_update_stub(),
                user_stub().id,
                event_stub().id
            )
            .await,
            Err(EventErr::DB(DBErr))
        );
    }
}

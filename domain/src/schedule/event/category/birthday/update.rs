use std::sync::LazyLock;

use araucaria::schema::{DateSchema, ObjSchema, Schema, StrSchema};

use crate::{
    generator::DateTimeGenerator,
    schedule::event::{
        error::EventErr,
        model::{Event, EventCategory, EventFrequency},
        repository::EventRepository,
        update::{EventUpdateInput, event_update},
    },
    session::Session,
};

pub struct BirthdayUpdateInput {
    pub name: String,
    pub day: String,
}

pub static BIRTHDAY_UPDATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 32))),
        ("day".into(), Schema::from(DateSchema::default().unix_epoch())),
    ]))
});

pub fn transform_to_event_update(model: BirthdayUpdateInput) -> EventUpdateInput {
    EventUpdateInput {
        name: model.name,
        begin: format!("{}T{}Z", model.day, "00:00"),
        end: format!("{}T{}Z", model.day, "23:59"),
        category: EventCategory::Birthday,
        frequency: Some(EventFrequency::Y1),
        weekend_repeat: None,
    }
}

pub async fn event_birthday_update<Repo: EventRepository, DtTmGen: DateTimeGenerator>(
    session: &Session,
    repository: &Repo,
    date_time_generator: &DtTmGen,
    model: BirthdayUpdateInput,
    id: String,
) -> Result<Event, EventErr> {
    let event_update_model = transform_to_event_update(model);
    event_update(session, repository, date_time_generator, event_update_model, id).await
}

#[cfg(test)]
mod tests {
    use crate::{
        generator::stub::DateTimeGeneratorStub,
        schedule::event::{
            model::{Event, EventCategory, EventFrequency},
            repository::stub::EventRepositoryStub,
            update::EventUpdateInput,
        },
        session::Session,
    };

    use super::{BirthdayUpdateInput, event_birthday_update, transform_to_event_update};

    #[test]
    fn test_transform_to_event_update() {
        assert_eq!(
            transform_to_event_update(BirthdayUpdateInput {
                name: "Fernando's birthday".into(),
                day: "2025-08-19".into()
            }),
            EventUpdateInput {
                name: "Fernando's birthday".into(),
                begin: "2025-08-19T00:00Z".into(),
                end: "2025-08-19T23:59Z".into(),
                category: EventCategory::Birthday,
                frequency: Some(EventFrequency::Y1),
                weekend_repeat: None,
            }
        );
    }

    #[tokio::test]
    async fn event_birthday_update_ok() {
        let session = Session {
            id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            username: "username".into(),
        };
        assert_eq!(
            event_birthday_update(
                &session,
                &EventRepositoryStub::of_event(Event {
                    id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                    name: "Frnando birthday".into(),
                    begin: "2024-03-31T00:00Z".into(),
                    end: "2024-03-31T23:59Z".into(),
                    category: EventCategory::Birthday,
                    frequency: Some(EventFrequency::Y1),
                    weekend_repeat: None,
                    user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                    created_at: "2025-02-05T22:49Z".into(),
                    updated_at: "2025-02-05T22:49Z".into(),
                }),
                &DateTimeGeneratorStub::of_iso("2025-05-22T20:26Z".into()),
                BirthdayUpdateInput {
                    name: "Fernando's birthday".into(),
                    day: "2025-08-19".into()
                },
                "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
            )
            .await,
            Ok(Event {
                id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                name: "Fernando's birthday".into(),
                begin: "2025-08-19T00:00Z".into(),
                end: "2025-08-19T23:59Z".into(),
                category: EventCategory::Birthday,
                frequency: Some(EventFrequency::Y1),
                weekend_repeat: None,
                user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                created_at: "2025-02-05T22:49Z".into(),
                updated_at: "2025-05-22T20:26Z".into(),
            })
        );
    }
}

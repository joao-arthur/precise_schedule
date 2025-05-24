use std::sync::LazyLock;

use araucaria::schema::{DateSchema, ObjSchema, Schema, StrSchema};

use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    schedule::event::{
        create::{EventCreateInput, event_create},
        error::EventErr,
        model::{Event, EventCategory, EventFrequency},
        repository::EventRepository,
    },
    session::Session,
};

pub struct BirthdayCreateInput {
    pub name: String,
    pub day: String,
}

pub static BIRTHDAY_CREATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 32))),
        ("day".into(), Schema::from(DateSchema::default().unix_epoch())),
    ]))
});

pub fn transform_to_event_create(model: BirthdayCreateInput) -> EventCreateInput {
    EventCreateInput {
        name: model.name,
        begin: format!("{}T{}Z", model.day, "00:00"),
        end: format!("{}T{}Z", model.day, "23:59"),
        category: EventCategory::Birthday,
        frequency: Some(EventFrequency::Y1),
        weekend_repeat: None,
    }
}

pub async fn event_birthday_create<
    Repo: EventRepository,
    IdGen: IdGenerator,
    DtTmGen: DateTimeGenerator,
>(
    session: &Session,
    repository: &Repo,
    id_generator: &IdGen,
    date_time_generator: &DtTmGen,
    model: BirthdayCreateInput,
) -> Result<Event, EventErr> {
    let event_create_model = transform_to_event_create(model);
    event_create(session, repository, id_generator, date_time_generator, event_create_model).await
}

#[cfg(test)]
mod tests {
    use crate::{
        generator::stub::{DateTimeGeneratorStub, IdGeneratorStub},
        schedule::event::{
            create::EventCreateInput,
            model::{Event, EventCategory, EventFrequency},
            repository::stub::EventRepositoryStub,
        },
        session::Session,
    };

    use super::{BirthdayCreateInput, event_birthday_create, transform_to_event_create};

    #[test]
    fn test_event_create_of_appointment_create() {
        assert_eq!(
            transform_to_event_create(BirthdayCreateInput {
                name: "Fernando's birthday".into(),
                day: "2025-08-19".into()
            }),
            EventCreateInput {
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
    async fn event_birthday_create_ok() {
        let session = Session {
            id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            username: "username".into(),
        };
        assert_eq!(
            event_birthday_create(
                &session,
                &EventRepositoryStub::of_empty(),
                &IdGeneratorStub("6d470410-5e51-40d1-bd13-0bb6a99de95e".into()),
                &DateTimeGeneratorStub::of_iso("2025-02-05T22:49Z".into()),
                BirthdayCreateInput {
                    name: "Fernando's birthday".into(),
                    day: "2025-08-19".into()
                },
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
                updated_at: "2025-02-05T22:49Z".into(),
            })
        );
    }
}

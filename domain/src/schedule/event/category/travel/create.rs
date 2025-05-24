use std::sync::LazyLock;

use araucaria::schema::{
     DateTimeSchema,  ObjSchema, Schema, StrSchema,
};

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

pub struct TravelCreateInput {
    pub name: String,
    pub begin: String,
    pub end: String,
}

pub static TRAVEL_CREATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 32))),
        ("begin".into(), Schema::from(DateTimeSchema::default().lt_field("end".into()))),
        ("end".into(), Schema::from(DateTimeSchema::default().gt_field("begin".into()))),
    ]))
});

pub fn transform_to_event_create(model: TravelCreateInput) -> EventCreateInput {
    EventCreateInput {
        name: model.name,
        begin: model.begin,
        end: model.end,
        category: EventCategory::Travel,
        frequency: None,
        weekend_repeat: None,
    }
}

pub async fn event_travel_create<
    Repo: EventRepository,
    IdGen: IdGenerator,
    DtTmGen: DateTimeGenerator,
>(
    session: &Session,
    repository: &Repo,
    id_generator: &IdGen,
    date_time_generator: &DtTmGen,
    model: TravelCreateInput,
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

    use super::{TravelCreateInput, event_travel_create, transform_to_event_create};

    #[test]
    fn test_transform_to_event_create() {
        assert_eq!(
            transform_to_event_create(TravelCreateInput {
                name: "Patagonia".into(),
                begin: "2025-12-28T00:00Z".into(),
                end: "2026-01-05T23:59Z".into(),
            }),
            EventCreateInput {
                name: "Patagonia".into(),
                begin: "2025-12-28T00:00Z".into(),
                end: "2026-01-05T23:59Z".into(),
                category: EventCategory::Travel,
                frequency: None,
                weekend_repeat: None,
            }
        );
    }

    #[tokio::test]
    async fn event_travel_create_ok() {
        let session = Session {
            id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            username: "username".into(),
        };
        assert_eq!(
            event_travel_create(
                &session,
                &EventRepositoryStub::of_empty(),
                &IdGeneratorStub("6d470410-5e51-40d1-bd13-0bb6a99de95e".into()),
                &DateTimeGeneratorStub::of_iso("2025-02-05T22:49Z".into()),
                TravelCreateInput {
                    name: "Patagonia".into(),
                    begin: "2025-12-28T00:00Z".into(),
                    end: "2026-01-05T23:59Z".into(),
                },
            )
            .await,
            Ok(Event {
                id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                name: "Patagonia".into(),
                begin: "2025-12-28T00:00Z".into(),
                end: "2026-01-05T23:59Z".into(),
                category: EventCategory::Travel,
                frequency: None,
                weekend_repeat: None,
                user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                created_at: "2025-02-05T22:49Z".into(),
                updated_at: "2025-02-05T22:49Z".into(),
            })
        );
    }
}

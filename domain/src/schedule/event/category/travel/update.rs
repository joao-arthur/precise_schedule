use std::sync::LazyLock;

use araucaria::schema::{DateTimeSchema, ObjSchema, Schema, StrSchema};

use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    schedule::event::{
        error::EventErr,
        model::{Event, EventCategory},
        repository::EventRepository,
        update::{EventUpdateInput, event_update},
    },
    session::Session,
};

pub struct TravelUpdateInput {
    pub name: String,
    pub begin: String,
    pub end: String,
}

pub static TRAVEL_UPDATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 32))),
        ("begin".into(), Schema::from(DateTimeSchema::default().lt_field("end".into()))),
        ("end".into(), Schema::from(DateTimeSchema::default().gt_field("begin".into()))),
    ]))
});

pub fn transform_to_event_update(model: TravelUpdateInput) -> EventUpdateInput {
    EventUpdateInput {
        name: model.name,
        begin: model.begin,
        end: model.end,
        category: EventCategory::Travel,
        frequency: None,
        weekend_repeat: None,
    }
}

pub async fn event_travel_update<Repo: EventRepository, DtTmGen: DateTimeGenerator>(
    session: &Session,
    repository: &Repo,
    date_time_generator: &DtTmGen,
    model: TravelUpdateInput,
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
            model::{Event, EventCategory},
            repository::stub::EventRepositoryStub,
            update::EventUpdateInput,
        },
        session::Session,
    };

    use super::{TravelUpdateInput, event_travel_update, transform_to_event_update};

    #[test]
    fn test_transform_to_event_update() {
        assert_eq!(
            transform_to_event_update(TravelUpdateInput {
                name: "Patagonia".into(),
                begin: "2025-12-28T00:00Z".into(),
                end: "2026-01-05T23:59Z".into(),
            }),
            EventUpdateInput {
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
    async fn event_travel_update_ok() {
        let session = Session {
            id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            username: "username".into(),
        };
        assert_eq!(
            event_travel_update(
                &session,
                &EventRepositoryStub::of_event(Event {
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
                }),
                &DateTimeGeneratorStub::of_iso("2025-02-05T22:49Z".into()),
                TravelUpdateInput {
                    name: "Patagonia".into(),
                    begin: "2025-12-28T00:00Z".into(),
                    end: "2026-01-05T23:59Z".into(),
                },
                "6d470410-5e51-40d1-bd13-0bb6a99de95e".into()
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

use std::sync::LazyLock;

use araucaria::schema::{DateSchema, ObjSchema, Schema, StrSchema, TimeSchema};

use crate::{
    generator::DateTimeGenerator,
    schedule::event::{
        error::EventErr,
        model::{Event, EventCategory},
        repository::EventRepository,
        update::{EventUpdateInput, event_update},
    },
    session::Session,
};

pub struct ConcertUpdateInput {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
}

pub static CONCERT_UPDATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 32))),
        ("day".into(), Schema::from(DateSchema::default().unix_epoch())),
        ("begin".into(), Schema::from(TimeSchema::default().lt_field("end".into()))),
        ("end".into(), Schema::from(TimeSchema::default().gt_field("begin".into()))),
    ]))
});

pub fn transform_to_event_update(model: ConcertUpdateInput) -> EventUpdateInput {
    EventUpdateInput {
        name: model.name,
        begin: format!("{}T{}Z", model.day, model.begin),
        end: format!("{}T{}Z", model.day, model.end),
        category: EventCategory::Concert,
        frequency: None,
        weekend_repeat: None,
    }
}

pub async fn event_concert_update<Repo: EventRepository, DtTmGen: DateTimeGenerator>(
    session: &Session,
    repository: &Repo,
    date_time_generator: &DtTmGen,
    model: ConcertUpdateInput,
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

    use super::{ConcertUpdateInput, event_concert_update, transform_to_event_update};

    #[test]
    fn test_transform_to_event_update() {
        assert_eq!(
            transform_to_event_update(ConcertUpdateInput {
                name: "Company year celebration".into(),
                day: "2025-11-29".into(),
                begin: "18:30".into(),
                end: "23:59".into(),
            }),
            EventUpdateInput {
                name: "Company year celebration".into(),
                begin: "2025-11-29T18:30Z".into(),
                end: "2025-11-29T23:59Z".into(),
                category: EventCategory::Concert,
                frequency: None,
                weekend_repeat: None,
            }
        );
    }

    #[tokio::test]
    async fn event_concert_update_ok() {
        let session = Session {
            id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            username: "username".into(),
        };
        assert_eq!(
            event_concert_update(
                &session,
                &EventRepositoryStub::of_event(Event {
                    id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                    name: "SOAD".into(),
                    begin: "2025-05-09T18:30Z".into(),
                    end: "2025-05-09T23:59Z".into(),
                    category: EventCategory::Concert,
                    frequency: None,
                    weekend_repeat: None,
                    user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                    created_at: "2025-02-05T22:49Z".into(),
                    updated_at: "2025-05-24T19:37Z".into(),
                }),
                &DateTimeGeneratorStub::of_iso("2025-05-24T19:37Z".into()),
                ConcertUpdateInput {
                    name: "System Of A Down concert".into(),
                    day: "2025-05-10".into(),
                    begin: "18:30".into(),
                    end: "23:59".into(),
                },
                "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
            )
            .await,
            Ok(Event {
                id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                name: "System Of A Down concert".into(),
                begin: "2025-05-10T18:30Z".into(),
                end: "2025-05-10T23:59Z".into(),
                category: EventCategory::Concert,
                frequency: None,
                weekend_repeat: None,
                user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                created_at: "2025-02-05T22:49Z".into(),
                updated_at: "2025-05-24T19:37Z".into(),
            })
        );
    }
}

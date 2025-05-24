use std::sync::LazyLock;

use araucaria::schema::{DateSchema, ObjSchema, Schema, StrSchema, TimeSchema};

use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    schedule::event::{
        create::{EventCreateInput, event_create},
        error::EventErr,
        model::{Event, EventCategory},
        repository::EventRepository,
    },
    session::Session,
};

pub struct PartyCreateInput {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
}

pub static PARTY_CREATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 32))),
        ("day".into(), Schema::from(DateSchema::default().unix_epoch())),
        ("begin".into(), Schema::from(TimeSchema::default().lt_field("end".into()))),
        ("end".into(), Schema::from(TimeSchema::default().gt_field("begin".into()))),
    ]))
});

pub fn transform_to_event_create(model: PartyCreateInput) -> EventCreateInput {
    EventCreateInput {
        name: model.name,
        begin: format!("{}T{}Z", model.day, model.begin),
        end: format!("{}T{}Z", model.day, model.end),
        category: EventCategory::Party,
        frequency: None,
        weekend_repeat: None,
    }
}

pub async fn event_party_create<
    Repo: EventRepository,
    IdGen: IdGenerator,
    DtTmGen: DateTimeGenerator,
>(
    session: &Session,
    repository: &Repo,
    id_generator: &IdGen,
    date_time_generator: &DtTmGen,
    model: PartyCreateInput,
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
            model::{Event, EventCategory},
            repository::stub::EventRepositoryStub,
        },
        session::Session,
    };

    use super::{PartyCreateInput, event_party_create, transform_to_event_create};

    #[test]
    fn test_transform_to_event_create() {
        assert_eq!(
            transform_to_event_create(PartyCreateInput {
                name: "Company year celebration".into(),
                day: "2025-11-29".into(),
                begin: "18:30".into(),
                end: "23:59".into(),
            }),
            EventCreateInput {
                name: "Company year celebration".into(),
                begin: "2025-11-29T18:30Z".into(),
                end: "2025-11-29T23:59Z".into(),
                category: EventCategory::Party,
                frequency: None,
                weekend_repeat: None,
            }
        );
    }

    #[tokio::test]
    async fn event_party_create_ok() {
        let session = Session {
            id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            username: "username".into(),
        };
        assert_eq!(
            event_party_create(
                &session,
                &EventRepositoryStub::of_empty(),
                &IdGeneratorStub("6d470410-5e51-40d1-bd13-0bb6a99de95e".into()),
                &DateTimeGeneratorStub::of_iso("2025-02-05T22:49Z".into()),
                PartyCreateInput {
                    name: "Company year celebration".into(),
                    day: "2025-11-29".into(),
                    begin: "18:30".into(),
                    end: "23:59".into(),
                },
            )
            .await,
            Ok(Event {
                id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                name: "Company year celebration".into(),
                begin: "2025-11-29T18:30Z".into(),
                end: "2025-11-29T23:59Z".into(),
                category: EventCategory::Party,
                frequency: None,
                weekend_repeat: None,
                user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                created_at: "2025-02-05T22:49Z".into(),
                updated_at: "2025-02-05T22:49Z".into(),
            })
        );
    }
}

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
};

pub struct DateCreateInput {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
}

pub static DATE_CREATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 32))),
        ("day".into(), Schema::from(DateSchema::default().unix_epoch())),
        ("begin".into(), Schema::from(TimeSchema::default().lt_field("end".into()))),
        ("end".into(), Schema::from(TimeSchema::default().gt_field("begin".into()))),
    ]))
});

pub fn transform_to_event_create(model: DateCreateInput) -> EventCreateInput {
    EventCreateInput {
        name: model.name,
        begin: format!("{}T{}Z", model.day, model.begin),
        end: format!("{}T{}Z", model.day, model.end),
        category: EventCategory::Date,
        frequency: None,
        weekend_repeat: None,
    }
}

pub async fn event_date_create<
    Repo: EventRepository,
    IdGen: IdGenerator,
    DtTmGen: DateTimeGenerator,
>(
    repository: &Repo,
    id_generator: &IdGen,
    date_time_generator: &DtTmGen,
    model: DateCreateInput,
    user_id: String,
) -> Result<Event, EventErr> {
    let event_create_model = transform_to_event_create(model);
    event_create(repository, id_generator, date_time_generator, event_create_model, user_id).await
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
    };

    use super::{DateCreateInput, event_date_create, transform_to_event_create};

    #[test]
    fn test_transform_to_event_create() {
        assert_eq!(
            transform_to_event_create(DateCreateInput {
                name: "Watch Final Destination on the cinema".into(),
                day: "2025-05-24".into(),
                begin: "13:00".into(),
                end: "16:00".into(),
            }),
            EventCreateInput {
                name: "Watch Final Destination on the cinema".into(),
                begin: "2025-05-24T13:00Z".into(),
                end: "2025-05-24T16:00Z".into(),
                category: EventCategory::Date,
                frequency: None,
                weekend_repeat: None,
            }
        );
    }

    #[tokio::test]
    async fn event_date_create_ok() {
        assert_eq!(
            event_date_create(
                &EventRepositoryStub::of_empty(),
                &IdGeneratorStub("6d470410-5e51-40d1-bd13-0bb6a99de95e".into()),
                &DateTimeGeneratorStub::of_iso("2025-02-05T22:49Z".into()),
                DateCreateInput {
                    name: "Watch Final Destination on the cinema".into(),
                    day: "2025-05-24".into(),
                    begin: "13:00".into(),
                    end: "16:00".into(),
                },
                "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into()
            )
            .await,
            Ok(Event {
                id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                name: "Watch Final Destination on the cinema".into(),
                begin: "2025-05-24T13:00Z".into(),
                end: "2025-05-24T16:00Z".into(),
                category: EventCategory::Date,
                frequency: None,
                weekend_repeat: None,
                user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                created_at: "2025-02-05T22:49Z".into(),
                updated_at: "2025-02-05T22:49Z".into(),
            })
        );
    }
}

use std::sync::LazyLock;

use araucaria::schema::{
    BoolSchema, DateSchema, EnumSchema, ObjSchema, Schema, StrSchema, TimeSchema,
};

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

pub struct AppointmentUpdateInput {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

pub static APPOINTMENT_UPDATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 32))),
        ("day".into(), Schema::from(DateSchema::default().unix_epoch())),
        ("begin".into(), Schema::from(TimeSchema::default().lt_field("end".into()))),
        ("end".into(), Schema::from(TimeSchema::default().gt_field("begin".into()))),
        (
            "frequency".into(),
            Schema::from(EnumSchema::from(["1D", "2D", "1W", "1M", "3M", "6M", "1Y", "2Y"])),
        ),
        ("weekend_repeat".into(), Schema::from(BoolSchema::default())),
    ]))
});

pub fn transform_to_event_update(model: AppointmentUpdateInput) -> EventUpdateInput {
    EventUpdateInput {
        name: model.name,
        begin: format!("{}T{}Z", model.day, model.begin),
        end: format!("{}T{}Z", model.day, model.end),
        category: EventCategory::Appointment,
        frequency: model.frequency,
        weekend_repeat: model.weekend_repeat,
    }
}

pub async fn event_appointment_update<Repo: EventRepository, DtTmGen: DateTimeGenerator>(
    session: &Session,
    repository: &Repo,
    date_time_generator: &DtTmGen,
    model: AppointmentUpdateInput,
    event_id: String,
) -> Result<Event, EventErr> {
    let event_update_model = transform_to_event_update(model);
    event_update(session, repository, date_time_generator, event_update_model, event_id).await
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

    use super::{AppointmentUpdateInput, event_appointment_update, transform_to_event_update};

    #[test]
    fn test_transform_to_event_update() {
        assert_eq!(
            transform_to_event_update(AppointmentUpdateInput {
                name: "Dentist".into(),
                day: "2024-03-31".into(),
                begin: "18:00".into(),
                end: "22:00".into(),
                frequency: Some(EventFrequency::D2),
                weekend_repeat: Some(true),
            }),
            EventUpdateInput {
                name: "Dentist".into(),
                begin: "2024-03-31T18:00Z".into(),
                end: "2024-03-31T22:00Z".into(),
                category: EventCategory::Appointment,
                frequency: Some(EventFrequency::D2),
                weekend_repeat: Some(true),
            }
        );
    }

    #[tokio::test]
    async fn event_appointment_update_ok() {
        let session = Session {
            id: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
            username: "username".into(),
        };
        assert_eq!(
            event_appointment_update(
                &session,
                &EventRepositoryStub::of_event(Event {
                    id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                    name: "Detist".into(),
                    begin: "2024-03-31T17:00Z".into(),
                    end: "2024-03-31T18:00Z".into(),
                    category: EventCategory::Appointment,
                    frequency: Some(EventFrequency::Y1),
                    weekend_repeat: Some(true),
                    user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                    created_at: "2025-02-05T22:49Z".into(),
                    updated_at: "2025-02-05T22:49Z".into(),
                }),
                &DateTimeGeneratorStub::of_iso("2025-05-22T20:26Z".into()),
                AppointmentUpdateInput {
                    name: "Dentist".into(),
                    day: "2024-03-31".into(),
                    begin: "18:00".into(),
                    end: "22:00".into(),
                    frequency: Some(EventFrequency::M1),
                    weekend_repeat: Some(true),
                },
                "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
            )
            .await,
            Ok(Event {
                id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
                name: "Dentist".into(),
                begin: "2024-03-31T18:00Z".into(),
                end: "2024-03-31T22:00Z".into(),
                category: EventCategory::Appointment,
                frequency: Some(EventFrequency::M1),
                weekend_repeat: Some(true),
                user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
                created_at: "2025-02-05T22:49Z".into(),
                updated_at: "2025-05-22T20:26Z".into(),
            })
        );
    }
}

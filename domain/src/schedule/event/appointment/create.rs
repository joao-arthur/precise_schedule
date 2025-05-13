use std::sync::LazyLock;

use araucaria::schema::{
    BoolSchema, DateSchema, EnumSchema, ObjSchema, Schema, StrSchema, TimeSchema,
};

use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    schedule::event::{
        create::{EventCreateInput, event_create},
        error::EventErr,
        model::{Event, EventCategory, EventFrequency},
        repository::EventRepository,
    },
};

pub struct AppointmentCreate {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

pub static APPOINTMENT_CREATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
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

pub fn transform_to_event_create(model: AppointmentCreate) -> EventCreateInput {
    EventCreateInput {
        name: model.name,
        begin: format!("{}T{}Z", model.day, model.begin),
        end: format!("{}T{}Z", model.day, model.end),
        category: EventCategory::Appointment,
        frequency: model.frequency,
        weekend_repeat: model.weekend_repeat,
    }
}

pub fn event_appointment_create<
    Repo: EventRepository,
    IdGen: IdGenerator,
    DtTmGen: DateTimeGenerator,
>(
    repository: &Repo,
    id_generator: &IdGen,
    date_time_generator: &DtTmGen,
    model: AppointmentCreate,
    user_id: String,
) -> Result<Event, EventErr> {
    let event_create_model = transform_to_event_create(model);
    event_create(repository, id_generator, date_time_generator, event_create_model, user_id)
}

#[cfg(test)]
mod tests {
    use crate::schedule::event::{
        create::EventCreateInput,
        model::{EventCategory, EventFrequency},
    };

    use super::{AppointmentCreate, transform_to_event_create};

    #[test]
    fn test_transform_to_event_create() {
        assert_eq!(
            transform_to_event_create(AppointmentCreate {
                name: "Dentist".into(),
                day: "2024-03-31".into(),
                begin: "18:00".into(),
                end: "22:00".into(),
                frequency: Some(EventFrequency::D2),
                weekend_repeat: Some(true),
            }),
            EventCreateInput {
                name: "Dentist".into(),
                begin: "2024-03-31T18:00Z".into(),
                end: "2024-03-31T22:00Z".into(),
                category: EventCategory::Appointment,
                frequency: Some(EventFrequency::D2),
                weekend_repeat: Some(true),
            }
        );
    }
}

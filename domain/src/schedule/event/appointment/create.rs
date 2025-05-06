use std::{collections::BTreeMap, sync::LazyLock};

use araucaria::validation::{BoolValidation, DateValidation, EnumValidation, ObjValidation, StrValidation, TimeValidation, Validation};

use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    schedule::event::{
        create::{EventCreate, event_create},
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
    pub frequency: Option<String>,
    pub weekend_repeat: Option<bool>,
}

pub static APPOINTMENT_CREATE_SCHEMA: LazyLock<Validation> = LazyLock::new(|| {
    Validation::Obj(ObjValidation::default().validation(BTreeMap::from([
        ("name".into(), Validation::Str(StrValidation::default().chars_len_btwn(1, 32))),
        ("day".into(), Validation::Date(DateValidation::default().ge("1970-01-01".into()))),
        ("begin".into(), Validation::Time(TimeValidation::default().lt_field("end".into()))),
        ("end".into(), Validation::Time(TimeValidation::default().gt_field("begin".into()))),
        ("frequency".into(), Validation::Enum(EnumValidation::from(["1D", "2D", "1W", "1M", "3M", "6M", "1Y", "2Y"]))),
        ("weekend_repeat".into(), Validation::Bool(BoolValidation::default())),
    ])))
});

pub fn event_create_from_appointment_create(model: AppointmentCreate) -> EventCreate {
    EventCreate {
        name: model.name,
        begin: format!("{}T{}Z", model.day, model.begin),
        end: format!("{}T{}Z", model.day, model.end),
        category: EventCategory::Appointment,
        frequency: model.frequency.and_then(|freq| EventFrequency::parse(&freq)),
        weekend_repeat: model.weekend_repeat,
    }
}

pub fn event_appointment_create(
    repository: &dyn EventRepository,
    id_generator: &dyn IdGenerator,
    date_time_generator: &dyn DateTimeGenerator,
    model: AppointmentCreate,
    user_id: String,
) -> Result<Event, EventErr> {
    let event_create_model = event_create_from_appointment_create(model);
    return event_create(repository, id_generator, date_time_generator, event_create_model, user_id);
}

#[cfg(test)]
mod test {
    use super::{AppointmentCreate, event_create_from_appointment_create};
    use crate::schedule::event::{
        create::EventCreate,
        model::{EventCategory, EventFrequency},
    };

    #[test]
    fn test_event_create_from_appointment() {
        let appointment = AppointmentCreate {
            name: "Dentist".into(),
            day: "2024-03-31".into(),
            begin: "18:00".into(),
            end: "22:00".into(),
            frequency: Some("2D".into()),
            weekend_repeat: Some(true),
        };
        let create_event = EventCreate {
            name: "Dentist".into(),
            begin: "2024-03-31T18:00Z".into(),
            end: "2024-03-31T22:00Z".into(),
            category: EventCategory::Appointment,
            frequency: Some(EventFrequency::D2),
            weekend_repeat: Some(true),
        };
        assert_eq!(event_create_from_appointment_create(appointment), create_event);
    }
}

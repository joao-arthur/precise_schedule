use std::{collections::BTreeMap, sync::LazyLock};

use araucaria::validation::{BoolValidation, DateValidation, EnumValidation, ObjValidation, StrValidation, TimeValidation, Validation};

use crate::{
    generator::{DateTimeGen, IdGen},
    schedule::event::{
        create::{EventC, event_c},
        error::EventErr,
        model::{Event, EventCat, EventFreq},
        repo::EventRepo,
    },
};

pub struct AppointmentC {
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

pub fn event_c_from_appointment_c(event: AppointmentC) -> EventC {
    EventC {
        name: event.name,
        begin: format!("{}T{}Z", event.day, event.begin),
        end: format!("{}T{}Z", event.day, event.end),
        category: EventCat::Appointment,
        frequency: event.frequency.and_then(|freq| EventFreq::parse(&freq)),
        weekend_repeat: event.weekend_repeat,
    }
}

pub fn event_appointment_c(
    repo: &dyn EventRepo,
    id_gen: &dyn IdGen,
    date_time_gen: &dyn DateTimeGen,
    appointment_c_model: AppointmentC,
    user_id: String,
) -> Result<Event, EventErr> {
    let event_c_model = event_c_from_appointment_c(appointment_c_model);
    return event_c(repo, id_gen, date_time_gen, event_c_model, user_id);
}

#[cfg(test)]
mod test {
    use super::{AppointmentC, event_c_from_appointment_c};
    use crate::schedule::event::{
        create::EventC,
        model::{EventCat, EventFreq},
    };

    #[test]
    fn test_event_c_from_appointment() {
        let appointment = AppointmentC {
            name: "Dentist".into(),
            day: "2024-03-31".into(),
            begin: "18:00".into(),
            end: "22:00".into(),
            frequency: Some("2D".into()),
            weekend_repeat: Some(true),
        };
        let create_event = EventC {
            name: "Dentist".into(),
            begin: "2024-03-31T18:00Z".into(),
            end: "2024-03-31T22:00Z".into(),
            category: EventCat::Appointment,
            frequency: Some(EventFreq::D2),
            weekend_repeat: Some(true),
        };
        assert_eq!(event_c_from_appointment_c(appointment), create_event);
    }
}

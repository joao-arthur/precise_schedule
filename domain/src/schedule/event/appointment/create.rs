use std::{collections::HashMap, sync::LazyLock};

use araucaria::validation::{bool::BoolValidation, date::DateValidation, email::EmailValidation, str::StrValidation, time::TimeValidation, ObjValidation, Validation};

use crate::{
    generator::{DateTimeGen, IdGen},
    schedule::event::{
        create::{event_c, EventC},
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

pub static APPOINTMENT_C_SCHEMA: LazyLock<Validation> = LazyLock::new(|| {
    Validation::Obj(ObjValidation {
        validation: HashMap::from([
            (
                "name",
                Validation::Str(StrValidation::default().required().min_graphemes_len(1).max_graphemes_len(32))
            ),
            (
                "day",
                Validation::Date(DateValidation::default().required().ge(String::from("1970-01-01")))
            ),
            ("begin", Validation::Time(TimeValidation::default().required())),
            // todo gt("begin")
            ("end", Validation::Time(TimeValidation::default().required())),
            //("frequency", Validation::StrEnum(["1D", "2D", "1W", "1M", "3M", "6M", "1Y", "2Y"])),
            (
                "weekend_repeat",
                Validation::Bool(BoolValidation::default()),
            ),
        ]),
        required: true
    })
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
    use super::*;

    #[test]
    fn test_event_c_from_appointment() {
        let appointment = AppointmentC {
            name: String::from("Dentist"),
            day: String::from("2024-03-31"),
            begin: String::from("18:00"),
            end: String::from("22:00"),
            frequency: Some(String::from("2D")),
            weekend_repeat: Some(true),
        };
        let create_event = EventC {
            name: String::from("Dentist"),
            begin: String::from("2024-03-31T18:00Z"),
            end: String::from("2024-03-31T22:00Z"),
            category: EventCat::Appointment,
            frequency: Some(EventFreq::D2),
            weekend_repeat: Some(true),
        };
        assert_eq!(event_c_from_appointment_c(appointment), create_event);
    }
}

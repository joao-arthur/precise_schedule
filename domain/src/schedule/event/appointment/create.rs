use std::{collections::HashMap, sync::LazyLock};

use crate::{
    generator::{DateTimeGen, IdGen},
    schedule::event::{
        create::{event_c, EventC},
        error::EventErr,
        model::{Event, EventCat, EventFreq},
        repo::EventRepo,
    },
    validation::{Schema, Val, Validator, V},
};

pub struct AppointmentC {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
    pub frequency: Option<String>,
    pub weekend_repeat: Option<bool>,
}

static APPOINTMENT_C_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    HashMap::from([
        ("name", vec![V::Required /*V::Str, V::StrMinLen(1), V::StrMaxLen(32)*/]),
        ("day", vec![V::Required /*V::Date, V::DateMin("1970-01-01")]*/]),
        ("begin", vec![V::Required /*V::Time*/]),
        ("end", vec![V::Required /*V::Time, V::Gt("begin")*/]),
        ("frequency", vec![/* V::Enum(vec!["1D", "2D", "1W", "1M", "3M", "6M", "1Y", "2Y"]) */]),
        ("weekend_repeat", vec![/*V::Bool*/]),
    ])
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
    validator: &dyn Validator,
    repo: &dyn EventRepo,
    id_gen: &dyn IdGen,
    date_time_gen: &dyn DateTimeGen,
    appointment_c_model: AppointmentC,
    user_id: String,
) -> Result<Event, EventErr> {
    let input_value = Val::Obj(HashMap::from([
        (String::from("name"), Val::Str(appointment_c_model.name.clone())),
        (String::from("day"), Val::Str(appointment_c_model.day.clone())),
        (String::from("begin"), Val::Str(appointment_c_model.begin.clone())),
        (String::from("end"), Val::Str(appointment_c_model.end.clone())),
        (
            String::from("frequency"),
            match appointment_c_model.frequency.clone() {
                Some(v) => Val::Str(v),
                None => Val::None,
            },
        ),
        (
            String::from("weekend_repeat"),
            match appointment_c_model.weekend_repeat.clone() {
                Some(v) => Val::Bool(v),
                None => Val::None,
            },
        ),
    ]));
    validator.validate(&APPOINTMENT_C_SCHEMA, &input_value).map_err(EventErr::Schema)?;
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

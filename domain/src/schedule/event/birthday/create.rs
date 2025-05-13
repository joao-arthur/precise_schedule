use std::sync::LazyLock;

use araucaria::schema::{DateSchema, ObjSchema, Schema, StrSchema};

use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    schedule::event::{
        create::{EventCreateInput, event_create},
        error::EventErr,
        model::{Event, EventCategory, EventFrequency},
        repository::EventRepository,
    },
};

pub struct BirthdayCreate {
    pub name: String,
    pub day: String,
}

pub static BIRTHDAY_CREATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 32))),
        ("day".into(), Schema::from(DateSchema::default().unix_epoch())),
    ]))
});

pub fn event_create_of_birthday_create(model: BirthdayCreate) -> EventCreateInput {
    EventCreateInput {
        name: model.name,
        begin: format!("{}T{}Z", model.day, "00:00"),
        end: format!("{}T{}Z", model.day, "23:59"),
        category: EventCategory::Birthday,
        frequency: Some(EventFrequency::Y1),
        weekend_repeat: None,
    }
}

pub fn event_birthday_create<
    Repo: EventRepository,
    IdGen: IdGenerator,
    DtTmGen: DateTimeGenerator,
>(
    repository: &Repo,
    id_generator: &IdGen,
    date_time_generator: &DtTmGen,
    model: BirthdayCreate,
    user_id: String,
) -> Result<Event, EventErr> {
    let event_create_model = event_create_of_birthday_create(model);
    event_create(repository, id_generator, date_time_generator, event_create_model, user_id)
}

#[cfg(test)]
mod tests {
    use crate::schedule::event::{
        create::EventCreateInput,
        model::{EventCategory, EventFrequency},
    };

    use super::{BirthdayCreate, event_create_of_birthday_create};

    #[test]
    fn test_event_create_of_appointment_create() {
        let birthday_create =
            BirthdayCreate { name: "Fernando's birthday".into(), day: "2025-08-19".into() };
        let event_create = EventCreateInput {
            name: "Fernando's birthday".into(),
            begin: "2025-08-19T00:00Z".into(),
            end: "2025-08-19T23:59Z".into(),
            category: EventCategory::Birthday,
            frequency: Some(EventFrequency::Y1),
            weekend_repeat: None,
        };
        assert_eq!(event_create_of_birthday_create(birthday_create), event_create);
    }
}

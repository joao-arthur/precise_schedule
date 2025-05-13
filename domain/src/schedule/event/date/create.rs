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

pub struct DateCreate {
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

pub fn event_date_create() {}

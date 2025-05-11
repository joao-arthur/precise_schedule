use std::sync::LazyLock;

use araucaria::schema::{BoolSchema, DateSchema, EnumSchema, ObjSchema, Schema, StrSchema, TimeSchema};

use crate::{
    generator::{DateTimeGenerator, IdGenerator},
    schedule::event::{
        create::{EventCreate, event_create},
        error::EventErr,
        model::{Event, EventCategory, EventFrequency},
        repository::EventRepository,
    },
};

pub struct MeetingCreate {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
    pub frequency: Option<String>,
    pub weekend_repeat: Option<bool>,
}

pub static MEETING_CREATE_SCHEMA: LazyLock<Schema> = LazyLock::new(|| {
    Schema::from(ObjSchema::from([
        ("name".into(), Schema::from(StrSchema::default().chars_len_btwn(1, 32))),
        ("day".into(), Schema::from(DateSchema::default().unix_epoch())),
        ("begin".into(), Schema::from(TimeSchema::default().lt_field("end".into()))),
        ("end".into(), Schema::from(TimeSchema::default().gt_field("begin".into()))),
        ("frequency".into(), Schema::from(EnumSchema::from(["1D", "2D", "1W", "1M", "3M", "6M", "1Y", "2Y"]))),
        ("weekend_repeat".into(), Schema::from(BoolSchema::default())),
    ]))
});

pub fn event_meeting_create() {}

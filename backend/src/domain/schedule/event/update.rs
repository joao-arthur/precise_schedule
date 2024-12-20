use crate::domain::generator::DateTimeGen;

use super::{
    error::EventErr,
    model::{Event, EventCategory, EventFrequency},
    repo::EventRepo,
};

#[derive(Debug, PartialEq)]
pub struct EventU {
    pub name: String,
    pub day: String,
    pub begin: String,
    pub end: String,
    pub category: EventCategory,
    pub frequency: Option<EventFrequency>,
    pub weekend_repeat: Option<bool>,
}

pub fn event_from_u(event_u: EventU, id: String, user_id: String, created_at: String) -> Event {
    Event {
        id,
        name: event_u.name,
        day: event_u.day,
        begin: event_u.begin,
        end: event_u.end,
        category: event_u.category,
        frequency: event_u.frequency,
        weekend_repeat: event_u.weekend_repeat,
        user: user_id,
        created_at: created_at.clone(),
        updated_at: created_at,
    }
}

pub fn event_c(
    repo: &dyn EventRepo,
    date_time_gen: &dyn DateTimeGen,
    event_u: EventU,
    event_id: String,
    user_id: String,
) -> Result<Event, EventErr> {
    let old_event = eventReadOne(&repo, &userId, &eventId)?;
    let now = date_time_gen.gen();
    let event = event_from_u(old_event, old_event.data, now);
    repo.cUpdate(event)?;
    return ok(event);
}
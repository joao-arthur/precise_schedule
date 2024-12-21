use crate::domain::database::{DBErr, DBOp};

use super::{
    create::EventC,
    model::{Event, EventCategory, EventFrequency},
    read::EventInfo,
    repo::EventRepo,
    update::EventU,
};

pub fn event_stub() -> Event {
    Event {
        id: String::from("6d470410-5e51-40d1-bd13-0bb6a99de95e"),
        name: String::from("Dentist"),
        day: String::from("2024-03-31"),
        begin: String::from("18:00"),
        end: String::from("22:00"),
        category: EventCategory::Appointment,
        frequency: Some(EventFrequency::D2),
        weekend_repeat: Some(true),
        user: String::from("a6edc906-2f9f-5fb2-a373-efac406f0ef2"),
        created_at: String::from("2025-02-05T22:49:51Z"),
        updated_at: String::from("2025-04-18T10:23:25Z"),
    }
}

pub fn event_c_stub() -> EventC {
    EventC {
        name: String::from("Dentist"),
        day: String::from("2024-03-31"),
        begin: String::from("18:00"),
        end: String::from("22:00"),
        category: EventCategory::Appointment,
        frequency: Some(EventFrequency::D2),
        weekend_repeat: Some(true),
    }
}

pub fn event_u_stub() -> EventU {
    EventU {
        name: String::from("Medical physicist"),
        day: String::from("2025-08-11"),
        begin: String::from("10:00"),
        end: String::from("11:00"),
        category: EventCategory::Appointment,
        frequency: None,
        weekend_repeat: None,
    }
}

pub fn event_after_c_stub() -> Event {
    Event { updated_at: String::from("2025-02-05T22:49:51Z"), ..event_stub() }
}

pub fn event_after_u_stub() -> Event {
    Event {
        name: String::from("Medical physicist"),
        day: String::from("2025-08-11"),
        begin: String::from("10:00"),
        end: String::from("11:00"),
        category: EventCategory::Appointment,
        frequency: None,
        weekend_repeat: None,
        ..event_stub()
    }
}

pub fn event_info_stub() -> EventInfo {
    EventInfo {
        name: String::from("Dentist"),
        day: String::from("2024-03-31"),
        begin: String::from("18:00"),
        end: String::from("22:00"),
        category: EventCategory::Appointment,
        frequency: Some(EventFrequency::D2),
        weekend_repeat: Some(true),
    }
}

pub struct EventRepoStub {
    err: bool,
    event: Option<Event>,
}

impl EventRepo for EventRepoStub {
    fn c(&self, _: &Event) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn u(&self, _: &Event) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn d(&self, _: &str) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn r_by_id(&self, _: &str, __: &str) -> DBOp<Option<Event>> {
        if self.err {
            return Err(DBErr);
        }
        Ok(self.event.clone())
    }

    fn r_by_user(&self, _: &str) -> DBOp<Vec<Event>> {
        if self.err {
            return Err(DBErr);
        }
        Ok(vec![self.event.clone()].into_iter().filter_map(|e| e).collect())
    }
}

impl Default for EventRepoStub {
    fn default() -> Self {
        EventRepoStub { err: false, event: Some(event_stub()) }
    }
}

impl EventRepoStub {
    pub fn of_none() -> Self {
        EventRepoStub { event: None, ..Default::default() }
    }

    pub fn of_db_err() -> Self {
        EventRepoStub { err: true, ..Default::default() }
    }
}

#[cfg(test)]
mod test {
    use crate::domain::schedule::user::stub::user_stub;

    use super::*;

    #[test]
    fn test_user_repo_stub_default() {
        assert_eq!(EventRepoStub::default().c(&event_stub()), Ok(()));
        assert_eq!(EventRepoStub::default().u(&event_stub()), Ok(()));
        assert_eq!(EventRepoStub::default().d(&event_stub().id), Ok(()));
        assert_eq!(
            EventRepoStub::default().r_by_id(&user_stub().id, &event_stub().id),
            Ok(Some(event_stub()))
        );
    }

    #[test]
    fn test_user_repo_stub_of_bd_err() {
        assert_eq!(EventRepoStub::of_db_err().c(&event_stub()), Err(DBErr));
        assert_eq!(EventRepoStub::of_db_err().u(&event_stub()), Err(DBErr));
        assert_eq!(EventRepoStub::of_db_err().d(&event_stub().id), Err(DBErr));
        assert_eq!(
            EventRepoStub::of_db_err().r_by_id(&user_stub().id, &event_stub().id),
            Err(DBErr)
        );
    }

    #[test]
    fn test_user_repo_stub_from_1() {
        assert_eq!(EventRepoStub::of_none().r_by_id(&user_stub().id, &event_stub().id), Ok(None));
    }
}

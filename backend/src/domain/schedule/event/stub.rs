use crate::domain::database::{DBErr, DBOp};

use super::{
    create::EventC,
    model::{Event, EventCategory, EventFrequency},
    repo::EventRepo,
};

pub fn event_stub() -> Event {
    Event {
        id: String::from("6d470410-5e51-40d1-bd13-0bb6a99de95e"),
        name: String::from("Party"),
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
        name: String::from("Party"),
        day: String::from("2024-03-31"),
        begin: String::from("18:00"),
        end: String::from("22:00"),
        category: EventCategory::Appointment,
        frequency: Some(EventFrequency::D2),
        weekend_repeat: Some(true),
    }
}

pub fn event_after_c_stub() -> Event {
    Event { updated_at: String::from("2025-02-05T22:49:51Z"), ..event_stub() }
}

pub struct EventRepoStub(DBOp<()>, Result<Option<Event>, DBErr>);

impl EventRepo for EventRepoStub {
    fn c(&self, _: &Event) -> DBOp<()> {
        self.0.clone()
    }

    fn u(&self, _: &Event) -> DBOp<()> {
        self.0.clone()
    }

    fn d(&self, _: &String) -> DBOp<()> {
        self.0.clone()
    }

    fn r_by_id(&self, _: &str) -> Result<Option<Event>, DBErr> {
        self.1.clone()
    }
}

impl Default for EventRepoStub {
    fn default() -> Self {
        EventRepoStub(Ok(()), Ok(Some(event_stub())))
    }
}

impl EventRepoStub {
    pub fn of_1(arg: Option<Event>) -> Self {
        EventRepoStub(EventRepoStub::default().0, Ok(arg))
    }

    pub fn of_db_err() -> Self {
        EventRepoStub(Err(DBErr), Err(DBErr))
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_user_repo_stub_default() {
        assert_eq!(EventRepoStub::default().c(&event_stub()), Ok(()));
        assert_eq!(EventRepoStub::default().u(&event_stub()), Ok(()));
        assert_eq!(EventRepoStub::default().d(&event_stub().id), Ok(()));
        assert_eq!(EventRepoStub::default().r_by_id(&event_stub().id), Ok(Some(event_stub())));
    }

    #[test]
    fn test_user_repo_stub_of_bd_err() {
        assert_eq!(EventRepoStub::of_db_err().c(&event_stub()), Err(DBErr));
        assert_eq!(EventRepoStub::of_db_err().u(&event_stub()), Err(DBErr));
        assert_eq!(EventRepoStub::of_db_err().d(&event_stub().id), Err(DBErr));
        assert_eq!(EventRepoStub::of_db_err().r_by_id(&event_stub().id), Err(DBErr));
    }

    #[test]
    fn test_user_repo_stub_from_1() {
        assert_eq!(EventRepoStub::of_1(None).r_by_id(&event_stub().id), Ok(None));
    }
}

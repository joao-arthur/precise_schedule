use crate::database::{DBErr, DBOp};

use super::{
    create::EventCreate,
    model::{Event, EventCategory, EventFrequency},
    read::EventInfo,
    repository::EventRepository,
    update::EventUpdate,
};

pub fn event_stub() -> Event {
    Event {
        id: "6d470410-5e51-40d1-bd13-0bb6a99de95e".into(),
        name: "Dentist".into(),
        begin: "2024-03-31T18:00Z".into(),
        end: "2024-03-31T22:00Z".into(),
        category: EventCategory::Appointment,
        frequency: Some(EventFrequency::D2),
        weekend_repeat: Some(true),
        user: "a6edc906-2f9f-5fb2-a373-efac406f0ef2".into(),
        created_at: "2025-02-05T22:49Z".into(),
        updated_at: "2025-04-18T10:23Z".into(),
    }
}

pub fn event_create_stub() -> EventCreate {
    EventCreate {
        name: "Dentist".into(),
        begin: "2024-03-31T18:00Z".into(),
        end: "2024-03-31T22:00Z".into(),
        category: EventCategory::Appointment,
        frequency: Some(EventFrequency::D2),
        weekend_repeat: Some(true),
    }
}

pub fn event_update_stub() -> EventUpdate {
    EventUpdate {
        name: "Medical physicist".into(),
        begin: "2025-08-11T10:00Z".into(),
        end: "2025-08-11T11:00Z".into(),
        category: EventCategory::Appointment,
        frequency: None,
        weekend_repeat: None,
    }
}

pub fn event_after_create_stub() -> Event {
    Event { updated_at: "2025-02-05T22:49Z".into(), ..event_stub() }
}

pub fn event_after_update_stub() -> Event {
    Event {
        name: "Medical physicist".into(),
        begin: "2025-08-11T10:00Z".into(),
        end: "2025-08-11T11:00Z".into(),
        category: EventCategory::Appointment,
        frequency: None,
        weekend_repeat: None,
        ..event_stub()
    }
}

pub fn event_info_stub() -> EventInfo {
    EventInfo {
        name: "Dentist".into(),
        begin: "2024-03-31T18:00Z".into(),
        end: "2024-03-31T22:00Z".into(),
        category: EventCategory::Appointment,
        frequency: Some(EventFrequency::D2),
        weekend_repeat: Some(true),
    }
}

pub struct EventRepositoryStub {
    err: bool,
    event: Option<Event>,
}

impl EventRepository for EventRepositoryStub {
    fn create(&self, _: &Event) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn update(&self, _: &Event) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn delete(&self, _: &str) -> DBOp<()> {
        if self.err {
            return Err(DBErr);
        }
        Ok(())
    }

    fn read_by_id(&self, _: &str, __: &str) -> DBOp<Option<Event>> {
        if self.err {
            return Err(DBErr);
        }
        Ok(self.event.clone())
    }

    fn read_by_user(&self, _: &str) -> DBOp<Vec<Event>> {
        if self.err {
            return Err(DBErr);
        }
        Ok(vec![self.event.clone()].into_iter().filter_map(|e| e).collect())
    }
}

impl Default for EventRepositoryStub {
    fn default() -> Self {
        EventRepositoryStub { err: false, event: None }
    }
}

impl EventRepositoryStub {
    pub fn of_none() -> Self {
        EventRepositoryStub { event: None, ..Default::default() }
    }

    pub fn of_event(event: Event) -> Self {
        EventRepositoryStub { event: Some(event), ..Default::default() }
    }

    pub fn of_db_err() -> Self {
        EventRepositoryStub { err: true, ..Default::default() }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        database::DBErr,
        schedule::{event::repository::EventRepository, user::model::stub::user_stub},
    };

    use super::{EventRepositoryStub, event_stub};

    #[test]
    fn user_repo_stub_default() {
        assert_eq!(EventRepositoryStub::default().create(&event_stub()), Ok(()));
        assert_eq!(EventRepositoryStub::default().update(&event_stub()), Ok(()));
        assert_eq!(EventRepositoryStub::default().delete(&event_stub().id), Ok(()));
    //    assert_eq!(EventRepositoryStub::default().read_by_id(&user_stub().id, &event_stub().id), Ok(Some(event_stub())));
    }

    #[test]
    fn user_repo_stub_of_bd_err() {
        assert_eq!(EventRepositoryStub::of_db_err().create(&event_stub()), Err(DBErr));
        assert_eq!(EventRepositoryStub::of_db_err().update(&event_stub()), Err(DBErr));
        assert_eq!(EventRepositoryStub::of_db_err().delete(&event_stub().id), Err(DBErr));
        assert_eq!(EventRepositoryStub::of_db_err().read_by_id(&user_stub().id, &event_stub().id), Err(DBErr));
    }

    #[test]
    fn user_repo_stub_from_1() {
        assert_eq!(EventRepositoryStub::of_none().read_by_id(&user_stub().id, &event_stub().id), Ok(None));
    }
}

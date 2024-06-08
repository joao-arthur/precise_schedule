struct AppointmentCreateModel {
    name: String,
    day: String,
    begin: String,
    end: String,
    frequency: String,
    weekendRepeat: bool,
}

fn build_event_create(event: AppointmentCreateModel) -> EventCreateModel {
    EventCreateModel {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: EventCategory.APPOINTMENT,
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    }
}

fn appointment_create(user_id: String, event: AppointmentCreateModel) -> Event {
    let event_create = build_event_create(event);
    return event_create(event_create);
}

#[cfg(test)]
mod test {
    use crate::domain::generator::id::service::IdGenerator;
    use crate::domain::generator::id::stub::IdGeneratorStub;

    #[test]
    fn test_stub() {
        let id_generator_stub = IdGeneratorStub::new(String::from("example"));
        let generated_id = id_generator_stub.generate();
        assert_eq!(generated_id, String::from("example"));
    }
}

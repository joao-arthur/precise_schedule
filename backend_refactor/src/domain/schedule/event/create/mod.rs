struct EventCreateModel {
    name: String,
    day: String,
    begin: String,
    end: String,
    category: EventCategory,
    frequency: EventFrequency,
    weekendRepeat: bool,
};

fn build_event(event: EventCreateModel, id: String) -> Event {
    Event {
        id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: event.category,
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
        user: userId,
        createdAt: String::from(""),
        updatedAt: String::from(""),
    }
}

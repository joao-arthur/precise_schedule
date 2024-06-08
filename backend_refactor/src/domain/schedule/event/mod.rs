pub mod appointment;

enum EventCategory {
    APPOINTMENT,
    BIRTHDAY,
    DATE,
    MEETING,
    PARTY,
}

enum EventFrequency {
    D1,
    D2,
    W1,
    M1,
    M3,
    M6,
    Y1,
    Y2,
}

struct Event {
    id: String,
    name: String,
    day: String,
    begin: String,
    end: String,
    category: EventCategory,
    frequency: EventFrequency,
    weekendRepeat: bool,
    user: String,
    createdAt: String,
    updatedAt: String,
}

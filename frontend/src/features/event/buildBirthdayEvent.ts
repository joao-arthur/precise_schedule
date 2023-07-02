import type { BirthdayEvent, CreateEvent } from "./event";

export function buildBirthdayEvent(
    event: BirthdayEvent,
): CreateEvent {
    return {
        name: event.name,
        day: event.day,
        begin: "00:00",
        end: "23:59",
        category: "BIRTHDAY",
        frequency: "1_Y",
        weekendRepeat: false,
    };
}

import type { CreateEvent, DateEvent } from "./event";

export function buildDateEvent(
    event: DateEvent,
): CreateEvent {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "DATE",
        frequency: "1_Y",
        weekendRepeat: false,
    };
}

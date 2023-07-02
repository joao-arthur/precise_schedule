import type { AppointmentEvent, CreateEvent } from "./event";

export function buildAppointmentEvent(
    event: AppointmentEvent,
): CreateEvent {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "APPOINTMENT",
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

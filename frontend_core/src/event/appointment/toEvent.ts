import type { Event } from "../event.js";
import type { Appointment } from "./appointment.js";

export function toEvent(event: Appointment): Event {
    return {
        id: event.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "APPOINTMENT",
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

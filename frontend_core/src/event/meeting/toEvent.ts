import type { Event } from "../event.js";
import type { Meeting } from "./meeting.js";

export function toEvent(event: Meeting): Event {
    return {
        id: event.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "MEETING",
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

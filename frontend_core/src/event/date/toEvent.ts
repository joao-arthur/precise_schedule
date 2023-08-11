import type { Event } from "../event.js";
import type { Date } from "./date.js";

export function toEvent(event: Date): Event {
    return {
        id: event.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "DATE",
        frequency: undefined,
        weekendRepeat: false,
    };
}

import type { Event } from "../event.js";
import type { Party } from "./party.js";

export function toEvent(event: Party): Event {
    return {
        id: event.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "PARTY",
        frequency: undefined,
        weekendRepeat: false,
    };
}

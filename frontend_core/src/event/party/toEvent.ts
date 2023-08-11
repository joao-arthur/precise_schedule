import type { Event } from "../event.js";
import type { Party } from "./party.js";
import { nanoid } from "nanoid";

export function toEvent(event: Party): Event {
    return {
        id: event.id || nanoid(32),
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "PARTY",
        frequency: undefined,
        weekendRepeat: false,
    };
}

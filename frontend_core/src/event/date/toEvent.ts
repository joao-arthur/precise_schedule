import type { Event } from "../event.js";
import type { Date } from "./date.js";
import { nanoid } from "nanoid";

export function toEvent(event: Date): Event {
    return {
        id: event.id || nanoid(32),
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "DATE",
        frequency: undefined,
        weekendRepeat: false,
    };
}

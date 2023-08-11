import type { Event } from "../event.js";
import type { Meeting } from "./meeting.js";
import { nanoid } from "nanoid";

export function toEvent(event: Meeting): Event {
    return {
        id: event.id || nanoid(32),
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "MEETING",
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

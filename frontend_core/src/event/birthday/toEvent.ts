import type { Event } from "../event.js";
import type { Birthday } from "./birthday.js";
import { nanoid } from "nanoid";

export function toEvent(event: Birthday): Event {
    return {
        id: event.id || nanoid(32),
        name: event.name,
        day: event.day,
        begin: "00:00",
        end: "23:59",
        category: "BIRTHDAY",
        frequency: "1Y",
        weekendRepeat: false,
    };
}

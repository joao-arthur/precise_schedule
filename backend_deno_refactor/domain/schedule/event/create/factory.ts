import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventCreateModel } from "./model.ts";

export function buildEvent(
    event: EventCreateModel,
    id: Event["id"],
    userId: User["id"],
): Event {
    return {
        id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: event.category,
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
        user: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}

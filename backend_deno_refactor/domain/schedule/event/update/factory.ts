import type { Event } from "../model.ts";
import type { EventUpdateModel } from "./model.ts";

export function buildEvent(event: EventUpdateModel, existingEvent: Event): Event {
    return {
        id: existingEvent.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: event.category,
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
        user: existingEvent.user,
        createdAt: existingEvent.createdAt,
        updatedAt: new Date(),
    };
}

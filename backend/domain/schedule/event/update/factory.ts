import type { Event } from "../model.ts";
import type { EventUpdateModel } from "./model.ts";

export type EventUpdateFactory = {
    readonly build: (event: EventUpdateModel, existingEvent: Event) => Event;
};

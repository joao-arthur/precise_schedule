import type { Event } from "../Event.ts";

export type FindEventService = {
    readonly findById: (id: Event["id"]) => Event;
};

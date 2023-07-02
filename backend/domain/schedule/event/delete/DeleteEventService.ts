import type { Event } from "../Event.ts";

export type DeleteEventService = {
    readonly del: (id: Event["id"]) => Promise<Event>;
};

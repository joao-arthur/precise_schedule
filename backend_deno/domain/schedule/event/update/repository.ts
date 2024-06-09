import type { Event } from "../model.ts";

export type EventUpdateRepository = {
    readonly update: (event: Event) => Promise<void>;
};

import type { Event } from "../Event.ts";

export type CreateEventRepository = {
    readonly create: (event: Event) => void;
};

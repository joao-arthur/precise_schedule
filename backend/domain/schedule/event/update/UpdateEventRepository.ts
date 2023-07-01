import type { Event } from "../Event.ts";

export type UpdateEventRepository = {
    readonly update: (event: Event) => void;
};

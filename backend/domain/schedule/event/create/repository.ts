import type { Event } from "../model.ts";

export type EventCreateRepository = {
    readonly create: (event: Event) => Promise<void>;
};

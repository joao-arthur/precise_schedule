import type { Event } from "../model.ts";

export type EventDeleteRepository = {
    readonly del: (id: Event["id"]) => Promise<void>;
};

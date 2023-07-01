import type { Event } from "../Event.ts";

export type FindEventRepository = {
    readonly findById: (id: Event["id"]) => Event | undefined;
};

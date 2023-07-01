import type { Event } from "../Event.ts";

export type DeleteEventRepository = {
    readonly del: (id: Event["id"]) => void;
};

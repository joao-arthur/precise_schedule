import type { Event } from "../Event.ts";

export type UpdateBirthdayEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
};

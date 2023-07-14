import type { Event } from "./event.ts";

export type UpdateBirthdayEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
};

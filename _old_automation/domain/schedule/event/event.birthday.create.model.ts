import type { Event } from "./event.ts";

export type CreateBirthdayEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
};

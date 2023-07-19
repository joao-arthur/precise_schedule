import type { Event } from "../Event.ts";

export type CreateBirthdayEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly user: Event["user"];
};

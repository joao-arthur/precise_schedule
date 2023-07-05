import type { Event } from "../Event.ts";

export type CreateDateEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

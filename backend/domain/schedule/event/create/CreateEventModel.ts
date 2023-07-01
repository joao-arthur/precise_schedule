import type { Event } from "../Event.ts";

export type CreateEventModel = {
    readonly name: Event["name"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

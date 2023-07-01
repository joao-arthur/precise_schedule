import type { Event } from "../Event.ts";

export type UpdateEventModel = {
    readonly name: Event["name"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

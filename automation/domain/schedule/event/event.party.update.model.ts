import type { Event } from "./event.ts";

export type UpdatePartyEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

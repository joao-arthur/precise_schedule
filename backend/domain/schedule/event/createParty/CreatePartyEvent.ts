import type { Event } from "../Event.ts";

export type CreatePartyEvent = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly user: Event["user"];
};

import type { Event } from "../event.js";

export type Date = {
    readonly id: Event["id"];
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

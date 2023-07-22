import type { Event } from "../model.ts";

export type EventCreateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly category: Event["category"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

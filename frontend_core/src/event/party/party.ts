import { Event } from "../event.js";

export type Party = {
    readonly id: Event["id"];
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

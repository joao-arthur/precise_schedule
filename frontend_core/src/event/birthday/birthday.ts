import type { Event } from "../event.js";

export type Birthday = {
    readonly id: Event["id"];
    readonly name: Event["name"];
    readonly day: Event["day"];
};

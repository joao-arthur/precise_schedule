import type { Event } from "../../model.ts";

export type BirthdayCreateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
};

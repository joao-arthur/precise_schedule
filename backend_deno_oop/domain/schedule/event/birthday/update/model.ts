import type { Event } from "../../model.ts";

export type BirthdayUpdateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
};

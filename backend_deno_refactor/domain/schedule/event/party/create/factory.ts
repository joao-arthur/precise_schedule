import type { EventCreateModel } from "../../create/model.ts";
import type { PartyCreateModel } from "./model.ts";

export function buildEventCreate(event: PartyCreateModel): EventCreateModel {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "PARTY",
        frequency: undefined,
        weekendRepeat: false,
    };
}

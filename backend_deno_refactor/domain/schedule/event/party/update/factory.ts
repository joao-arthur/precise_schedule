import type { EventUpdateModel } from "../../update/model.ts";
import type { PartyUpdateModel } from "./model.ts";

export function buildEventUpdate(event: PartyUpdateModel): EventUpdateModel {
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
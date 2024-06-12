import type { EventUpdateModel } from "../../update/model.ts";
import type { DateUpdateModel } from "./model.ts";

export function buildEventUpdate(event: DateUpdateModel): EventUpdateModel {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "DATE",
        frequency: undefined,
        weekendRepeat: false,
    };
}

import type { EventCreateModel } from "../../create/model.ts";
import type { MeetingCreateModel } from "./model.ts";

export function buildEventCreate(event: MeetingCreateModel): EventCreateModel {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "MEETING",
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

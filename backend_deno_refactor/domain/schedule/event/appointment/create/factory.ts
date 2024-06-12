import type { EventCreateModel } from "../../create/model.ts";
import type { AppointmentCreateModel } from "./model.ts";

export function buildEventCreate(event: AppointmentCreateModel): EventCreateModel {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "APPOINTMENT",
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

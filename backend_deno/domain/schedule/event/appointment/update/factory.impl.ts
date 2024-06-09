import type { EventUpdateModel } from "../../update/model.ts";
import type { AppointmentUpdateModel } from "./model.ts";
import type { AppointmentUpdateFactory } from "./factory.ts";

export class AppointmentUpdateFactoryImpl implements AppointmentUpdateFactory {
    public build(event: AppointmentUpdateModel): EventUpdateModel {
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
}

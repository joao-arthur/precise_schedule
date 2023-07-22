import type { EventUpdateModel } from "../../update/model.ts";
import type { DateUpdateModel } from "./model.ts";
import type { DateUpdateFactory } from "./factory.ts";

export class DateUpdateFactoryImpl implements DateUpdateFactory {
    public build(event: DateUpdateModel): EventUpdateModel {
        return {
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: "DATE",
            frequency: "NEVER",
            weekendRepeat: false,
        };
    }
}

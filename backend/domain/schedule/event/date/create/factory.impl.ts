import type { EventCreateModel } from "../../create/model.ts";
import type { DateCreateModel } from "./model.ts";
import type { DateCreateFactory } from "./factory.ts";

export class DateCreateFactoryImpl implements DateCreateFactory {
    public build(event: DateCreateModel): EventCreateModel {
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
}

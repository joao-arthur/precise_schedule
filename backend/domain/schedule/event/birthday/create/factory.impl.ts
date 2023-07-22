import type { EventCreateModel } from "../../create/model.ts";
import type { BirthdayCreateModel } from "./model.ts";
import type { BirthdayCreateFactory } from "./factory.ts";

export class BirthdayCreateFactoryImpl implements BirthdayCreateFactory {
    public build(event: BirthdayCreateModel): EventCreateModel {
        return {
            name: event.name,
            day: event.day,
            begin: "00:00",
            end: "23:59",
            category: "BIRTHDAY",
            frequency: "1_Y",
            weekendRepeat: false,
        };
    }
}

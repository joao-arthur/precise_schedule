import type { EventUpdateModel } from "../../update/model.ts";
import type { BirthdayUpdateModel } from "./model.ts";
import type { BirthdayUpdateFactory } from "./factory.ts";

export class BirthdayUpdateFactoryImpl implements BirthdayUpdateFactory {
    public build(event: BirthdayUpdateModel): EventUpdateModel {
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

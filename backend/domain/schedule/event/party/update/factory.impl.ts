import type { EventUpdateModel } from "../../update/model.ts";
import type { PartyUpdateModel } from "./model.ts";
import type { PartyUpdateFactory } from "./factory.ts";

export class PartyUpdateFactoryImpl implements PartyUpdateFactory {
    public build(event: PartyUpdateModel): EventUpdateModel {
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
}

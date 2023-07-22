import type { EventCreateModel } from "../../create/model.ts";
import type { PartyCreateModel } from "./model.ts";
import type { PartyCreateFactory } from "./factory.ts";

export class PartyCreateFactoryImpl implements PartyCreateFactory {
    public build(event: PartyCreateModel): EventCreateModel {
        return {
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: "PARTY",
            frequency: "NEVER",
            weekendRepeat: false,
        };
    }
}

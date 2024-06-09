import type { EventCreateModel } from "../../create/model.ts";
import type { MeetingCreateModel } from "./model.ts";
import type { MeetingCreateFactory } from "./factory.ts";

export class MeetingCreateFactoryImpl implements MeetingCreateFactory {
    public build(event: MeetingCreateModel): EventCreateModel {
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
}

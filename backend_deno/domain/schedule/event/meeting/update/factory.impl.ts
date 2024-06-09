import type { EventUpdateModel } from "../../update/model.ts";
import type { MeetingUpdateModel } from "./model.ts";
import type { MeetingUpdateFactory } from "./factory.ts";

export class MeetingUpdateFactoryImpl implements MeetingUpdateFactory {
    public build(event: MeetingUpdateModel): EventUpdateModel {
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

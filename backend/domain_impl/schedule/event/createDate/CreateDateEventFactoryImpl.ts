import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateDateEvent } from "@ps/domain/schedule/event/createDate/CreateDateEvent.ts";
import type { CreateDateEventFactory } from "@ps/domain/schedule/event/createDate/CreateDateEventFactory.ts";

export class CreateDateEventFactoryImpl implements CreateDateEventFactory {
    public build(event: CreateDateEvent): CreateEventModel {
        return {
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: "DATE",
            frequency: "NEVER",
            weekendRepeat: false,
            user: event.user,
        };
    }
}

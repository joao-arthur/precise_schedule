import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";
import type { CreateBirthdayEventFactory } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEventFactory.ts";

export class CreateBirthdayEventFactoryImpl implements CreateBirthdayEventFactory {
    public build(event: CreateBirthdayEvent): CreateEventModel {
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

import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdateBirthdayEvent } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEvent.ts";
import type { UpdateBirthdayEventFactory } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEventFactory.ts";

export class UpdateBirthdayEventFactoryImpl
    implements UpdateBirthdayEventFactory {
    public build(event: UpdateBirthdayEvent): UpdateEventModel {
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

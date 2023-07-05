import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdateDateEvent } from "@ps/domain/schedule/event/updateDate/UpdateDateEvent.ts";
import type { UpdateDateEventFactory } from "@ps/domain/schedule/event/updateDate/UpdateDateEventFactory.ts";

export class UpdateDateEventFactoryImpl
    implements UpdateDateEventFactory {
    public build(event: UpdateDateEvent): UpdateEventModel {
        return {
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: "DATE",
            frequency: "1_Y",
            weekendRepeat: false,
        };
    }
}

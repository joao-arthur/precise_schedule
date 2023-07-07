import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateBirthdayEvent } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEvent.ts";
import type { UpdateBirthdayEventFactoryImpl } from "../updateBirthday/UpdateBirthdayEventFactoryImpl.ts";

export class UpdateBirthdayEventServiceImpl {
    constructor(
        private readonly factory: UpdateBirthdayEventFactoryImpl,
        private readonly service: UpdateEventService,
    ) {}

    public update(
        id: Event["id"],
        event: UpdateBirthdayEvent,
    ): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.update(id, buildedEvent);
    }
}

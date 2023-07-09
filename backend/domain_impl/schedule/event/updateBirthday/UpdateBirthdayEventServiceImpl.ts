import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateBirthdayEvent } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEvent.ts";
import type { UpdateBirthdayEventFactory } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEventFactory.ts";
import type { UpdateBirthdayEventService } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEventService.ts";

export class UpdateBirthdayEventServiceImpl implements UpdateBirthdayEventService {
    constructor(
        private readonly factory: UpdateBirthdayEventFactory,
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

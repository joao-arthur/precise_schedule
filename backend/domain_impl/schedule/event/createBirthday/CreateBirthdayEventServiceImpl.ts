import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";
import type { CreateBirthdayEventFactory } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEventFactory.ts";
import type { CreateBirthdayEventService } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEventService.ts";

export class CreateBirthdayEventServiceImpl
    implements CreateBirthdayEventService {
    constructor(
        private readonly factory: CreateBirthdayEventFactory,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreateBirthdayEvent): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

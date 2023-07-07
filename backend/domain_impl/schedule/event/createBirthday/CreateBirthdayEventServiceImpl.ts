import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";
import type { CreateBirthdayEventFactoryImpl } from "../createBirthday/CreateBirthdayEventFactoryImpl.ts";

export class CreateBirthdayEventServiceImpl {
    constructor(
        private readonly factory: CreateBirthdayEventFactoryImpl,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreateBirthdayEvent): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

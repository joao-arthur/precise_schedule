import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateDateEvent } from "@ps/domain/schedule/event/createDate/CreateDateEvent.ts";
import type { CreateDateEventFactory } from "@ps/domain/schedule/event/createDate/CreateDateEventFactory.ts";
import type { CreateDateEventService } from "@ps/domain/schedule/event/createDate/CreateDateEventService.ts";

export class CreateDateEventServiceImpl
    implements CreateDateEventService {
    constructor(
        private readonly factory: CreateDateEventFactory,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreateDateEvent): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

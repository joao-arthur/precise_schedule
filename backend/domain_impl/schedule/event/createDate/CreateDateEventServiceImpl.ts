import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateDateEvent } from "@ps/domain/schedule/event/createDate/CreateDateEvent.ts";
import type { CreateDateEventFactoryImpl } from "../createDate/CreateDateEventFactoryImpl.ts";

export class CreateDateEventServiceImpl {
    constructor(
        private readonly factory: CreateDateEventFactoryImpl,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreateDateEvent): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

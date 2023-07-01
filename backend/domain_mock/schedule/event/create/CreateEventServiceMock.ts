import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";

export class CreateEventServiceMock implements CreateEventService {
    constructor(private readonly event: Event) {}

    public create(): Event {
        return this.event;
    }
}

import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventFactory } from "@ps/domain/schedule/event/create/CreateEventFactory.ts";

export class CreateEventFactoryMock implements CreateEventFactory {
    constructor(private readonly event: Event) {}

    public build(): Event {
        return this.event;
    }
}

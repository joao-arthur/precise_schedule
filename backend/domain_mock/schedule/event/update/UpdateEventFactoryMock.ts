import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventFactory } from "@ps/domain/schedule/event/update/UpdateEventFactory.ts";

export class UpdateEventFactoryMock implements UpdateEventFactory {
    constructor(private readonly event: Event) {}

    public build(): Event {
        return this.event;
    }
}

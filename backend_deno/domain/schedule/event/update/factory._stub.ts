import type { Event } from "../model.ts";
import type { EventUpdateFactory } from "./factory.ts";

export class EventUpdateFactoryStub implements EventUpdateFactory {
    constructor(private readonly event: Event) {}

    public build(): Event {
        return this.event;
    }
}

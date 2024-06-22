import type { Event } from "../model.ts";
import type { EventCreateFactory } from "./factory.ts";

export class EventCreateFactoryStub implements EventCreateFactory {
    constructor(private readonly event: Event) {}

    public build(): Event {
        return this.event;
    }
}

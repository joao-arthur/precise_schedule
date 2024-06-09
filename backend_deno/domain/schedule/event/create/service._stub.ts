import type { Event } from "../model.ts";
import type { EventCreateService } from "./service.ts";

export class EventCreateServiceStub implements EventCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

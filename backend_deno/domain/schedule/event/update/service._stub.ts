import type { Event } from "../model.ts";
import type { EventUpdateService } from "./service.ts";

export class EventUpdateServiceStub implements EventUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

import type { Event } from "../model.ts";
import type { EventFindService } from "./service.ts";

export class EventFindServiceStub implements EventFindService {
    constructor(private readonly event: Event) {}

    public findByUser(): Promise<Event[]> {
        return Promise.resolve([this.event]);
    }

    public findByUserAndId(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

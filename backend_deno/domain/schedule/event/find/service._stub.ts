import type { Event } from "../model.ts";
import type { EventFindModel } from "./model.ts";
import type { EventFindService } from "./service.ts";

export class EventFindServiceStub implements EventFindService {
    constructor(
        private readonly event: Event,
        private readonly eventFind: EventFindModel,
    ) {}

    public findByUser(): Promise<Event[]> {
        return Promise.resolve([this.event]);
    }

    public findByUserMapped(): Promise<EventFindModel[]> {
        return Promise.resolve([this.eventFind]);
    }

    public findByUserAndId(): Promise<Event> {
        return Promise.resolve(this.event);
    }
    public findByUserAndIdMapped(): Promise<EventFindModel> {
        return Promise.resolve(this.eventFind);
    }
}

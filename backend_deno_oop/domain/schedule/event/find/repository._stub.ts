import type { Event } from "../model.ts";
import type { EventFindRepository } from "./repository.ts";

export class EventFindRepositoryStub implements EventFindRepository {
    constructor(private readonly event: Event | undefined) {}

    public findByUser(): Promise<Event[]> {
        return Promise.resolve(this.event ? [this.event] : []);
    }

    public findByUserAndId(): Promise<Event | undefined> {
        return Promise.resolve(this.event);
    }
}

import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { FindEventService } from "@ps/domain/schedule/event/find/FindEventService.ts";

export class FindEventServiceMock implements FindEventService {
    constructor(private readonly event: Event) {}

    public findByUserAndId(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

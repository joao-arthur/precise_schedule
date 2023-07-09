import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateDateEventService } from "@ps/domain/schedule/event/createDate/CreateDateEventService.ts";

export class CreateDateEventServiceMock implements CreateDateEventService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

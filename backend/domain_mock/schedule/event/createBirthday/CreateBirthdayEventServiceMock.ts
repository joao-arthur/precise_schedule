import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateBirthdayEventService } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEventService.ts";

export class CreateBirthdayEventServiceMock
    implements CreateBirthdayEventService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

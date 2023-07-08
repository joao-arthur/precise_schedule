import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateBirthdayEventService } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEventService.ts";

export class UpdateBirthdayEventServiceMock
    implements UpdateBirthdayEventService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

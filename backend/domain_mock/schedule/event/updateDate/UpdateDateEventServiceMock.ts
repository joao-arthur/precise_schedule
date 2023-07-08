import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateDateEventService } from "@ps/domain/schedule/event/updateDate/UpdateDateEventService.ts";

export class UpdateDateEventServiceMock
    implements UpdateDateEventService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

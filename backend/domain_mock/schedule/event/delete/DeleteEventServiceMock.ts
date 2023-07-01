import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { DeleteEventService } from "@ps/domain/schedule/event/delete/DeleteEventService.ts";

export class DeleteEventServiceMock implements DeleteEventService {
    constructor(private readonly event: Event) {}

    del(): Event {
        return this.event;
    }
}

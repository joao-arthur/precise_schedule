import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdatePartyEventService } from "@ps/domain/schedule/event/updateParty/UpdatePartyEventService.ts";

export class UpdatePartyEventServiceMock implements UpdatePartyEventService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreatePartyEventService } from "@ps/domain/schedule/event/createParty/CreatePartyEventService.ts";

export class CreatePartyEventServiceMock
    implements CreatePartyEventService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

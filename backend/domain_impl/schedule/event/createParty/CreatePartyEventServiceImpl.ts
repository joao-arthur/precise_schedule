import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreatePartyEvent } from "@ps/domain/schedule/event/createParty/CreatePartyEvent.ts";
import type { CreatePartyEventFactory } from "@ps/domain/schedule/event/createParty/CreatePartyEventFactory.ts";
import type { CreatePartyEventService } from "@ps/domain/schedule/event/createParty/CreatePartyEventService.ts";

export class CreatePartyEventServiceImpl implements CreatePartyEventService {
    constructor(
        private readonly factory: CreatePartyEventFactory,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreatePartyEvent): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

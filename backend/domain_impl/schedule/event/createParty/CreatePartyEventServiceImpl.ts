import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreatePartyEvent } from "@ps/domain/schedule/event/createParty/CreatePartyEvent.ts";

import { CreatePartyEventFactoryImpl } from "../createParty/CreatePartyEventFactoryImpl.ts";

export class CreatePartyEventServiceImpl {
    constructor(
        private readonly factory: CreatePartyEventFactoryImpl,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreatePartyEvent): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreatePartyEvent } from "@ps/domain/schedule/event/createParty/CreatePartyEvent.ts";
import type { CreatePartyEventFactory } from "@ps/domain/schedule/event/createParty/CreatePartyEventFactory.ts";
import type { CreatePartyEventService } from "@ps/domain/schedule/event/createParty/CreatePartyEventService.ts";

import { createPartyValidation } from "@ps/domain/schedule/event/createParty/createPartyValidation.ts";

export class CreatePartyEventServiceImpl implements CreatePartyEventService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: CreatePartyEventFactory,
        private readonly service: CreateEventService,
    ) {}

    public create(userId: User["id"], event: CreatePartyEvent): Promise<Event> {
        this.validator.validate(event, createPartyValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";
import type { UpdatePartyEventFactory } from "@ps/domain/schedule/event/updateParty/UpdatePartyEventFactory.ts";
import type { UpdatePartyEventService } from "@ps/domain/schedule/event/updateParty/UpdatePartyEventService.ts";

import { updatePartyValidation } from "@ps/domain/schedule/event/updateParty/updatePartyValidation.ts";

export class UpdatePartyEventServiceImpl implements UpdatePartyEventService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: UpdatePartyEventFactory,
        private readonly service: UpdateEventService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: UpdatePartyEvent,
    ): Promise<Event> {
        this.validator.validate(event, updatePartyValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.update(userId, id, buildedEvent);
    }
}

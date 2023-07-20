import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateDateEvent } from "@ps/domain/schedule/event/updateDate/UpdateDateEvent.ts";
import type { UpdateDateEventFactory } from "@ps/domain/schedule/event/updateDate/UpdateDateEventFactory.ts";
import type { UpdateDateEventService } from "@ps/domain/schedule/event/updateDate/UpdateDateEventService.ts";

import { updateDateValidation } from "@ps/domain/schedule/event/updateDate/updateDateValidation.ts";

export class UpdateDateEventServiceImpl implements UpdateDateEventService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: UpdateDateEventFactory,
        private readonly service: UpdateEventService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: UpdateDateEvent,
    ): Promise<Event> {
        this.validator.validate(event, updateDateValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.update(userId, id, buildedEvent);
    }
}

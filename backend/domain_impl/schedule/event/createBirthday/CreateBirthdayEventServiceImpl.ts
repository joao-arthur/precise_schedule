import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";
import type { CreateBirthdayEventFactory } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEventFactory.ts";
import type { CreateBirthdayEventService } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEventService.ts";

import { createBirthdayValidation } from "@ps/domain/schedule/event/createBirthday/createBirthdayValidation.ts";

export class CreateBirthdayEventServiceImpl implements CreateBirthdayEventService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: CreateBirthdayEventFactory,
        private readonly service: CreateEventService,
    ) {}

    public create(userId: User["id"], event: CreateBirthdayEvent): Promise<Event> {
        this.validator.validate(event, createBirthdayValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

import type { Validator } from "../../../../validation/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { DateCreateModel } from "./model.ts";
import type { DateCreateService } from "./service.ts";
import type { DateCreateFactory } from "./factory.ts";

import { createDateValidation } from "./validation.ts";

export class DateCreateServiceImpl implements DateCreateService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: DateCreateFactory,
        private readonly service: EventCreateService,
    ) {}

    public create(userId: User["id"], event: DateCreateModel): Promise<Event> {
        this.validator.validate(event, createDateValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

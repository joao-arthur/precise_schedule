import type { Validator } from "../../../../validation/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { PartyCreateModel } from "./model.ts";
import type { PartyCreateFactory } from "./factory.ts";
import type { PartyCreateService } from "./service.ts";

import { createPartyValidation } from "./validation.ts";

export class PartyCreateServiceImpl implements PartyCreateService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: PartyCreateFactory,
        private readonly service: EventCreateService,
    ) {}

    public create(userId: User["id"], event: PartyCreateModel): Promise<Event> {
        this.validator.validate(event, createPartyValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

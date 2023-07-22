import type { Validator } from "../../../../validation/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventUpdateService } from "../../update/service.ts";
import type { PartyUpdateModel } from "./model.ts";
import type { PartyUpdateService } from "./service.ts";
import type { PartyUpdateFactory } from "./factory.ts";

import { updatePartyValidation } from "./validation.ts";

export class PartyUpdateServiceImpl implements PartyUpdateService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: PartyUpdateFactory,
        private readonly service: EventUpdateService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: PartyUpdateModel,
    ): Promise<Event> {
        this.validator.validate(event, updatePartyValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.update(userId, id, buildedEvent);
    }
}

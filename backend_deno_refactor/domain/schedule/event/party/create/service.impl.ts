import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { PartyCreateModel } from "./model.ts";
import type { PartyCreateFactory } from "./factory.ts";
import type { PartyCreateService } from "./service.ts";
import { buildErr, buildOk } from "../../../../lang/result.ts";
import { createPartyValidation } from "./validation.ts";

export class PartyCreateServiceImpl implements PartyCreateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly factory: PartyCreateFactory,
        private readonly service: EventCreateService,
    ) {}

    public create(userId: User["id"], event: PartyCreateModel): Promise<Event> {
        const modelValidation = this.validator.validate(event, createPartyValidation);
        if (modelValidation.type === "err") {
            return buildErr(modelValidation.error);
        }
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

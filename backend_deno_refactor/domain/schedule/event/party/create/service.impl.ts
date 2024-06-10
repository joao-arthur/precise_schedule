import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { PartyCreateModel } from "./model.ts";
import type { PartyCreateFactory } from "./factory.ts";
import type { PartyCreateService } from "./service.ts";
import { createPartyValidation } from "./validation.ts";

export class PartyCreateServiceImpl implements PartyCreateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly factory: PartyCreateFactory,
        private readonly service: EventCreateService,
    ) {}

    public create(userId: User["id"], event: PartyCreateModel): Promise<Result<Event>> {
        const validationResult = this.validator.validate(event, createPartyValidation);
        if (validationResult.type === "err") {
            return Promise.resolve(validationResult);
        }
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { PartyCreateModel } from "./model.ts";
import type { PartyCreateErrors, PartyCreateService } from "./service.ts";
import { buildEventCreate } from "./factory.ts";
import { createPartySchema } from "./validation.ts";

export class PartyCreateServiceImpl implements PartyCreateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly service: EventCreateService,
    ) {}

    public create(
        userId: User["id"],
        event: PartyCreateModel,
    ): Promise<Result<Event, PartyCreateErrors>> {
        const validationResult = this.validator.validate(event, createPartySchema);
        if (validationResult.type === "err") {
            return Promise.resolve(validationResult);
        }
        const builtEvent = buildEventCreate(event);
        return this.service.create(userId, builtEvent);
    }
}

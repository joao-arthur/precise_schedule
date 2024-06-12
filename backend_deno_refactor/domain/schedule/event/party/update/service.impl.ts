import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventUpdateService } from "../../update/service.ts";
import type { PartyUpdateModel } from "./model.ts";
import type { PartyUpdateFactory } from "./factory.ts";
import type { PartyUpdateErrors, PartyUpdateService } from "./service.ts";
import { updatePartyValidation } from "./validation.ts";

export class PartyUpdateServiceImpl implements PartyUpdateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly factory: PartyUpdateFactory,
        private readonly service: EventUpdateService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: PartyUpdateModel,
    ): Promise<Result<Event, PartyUpdateErrors>> {
        const validationResult = this.validator.validate(event, updatePartyValidation);
        if (validationResult.type === "err") {
            return Promise.resolve(validationResult);
        }
        const builtEvent = this.factory.build(event);
        return this.service.update(userId, id, builtEvent);
    }
}

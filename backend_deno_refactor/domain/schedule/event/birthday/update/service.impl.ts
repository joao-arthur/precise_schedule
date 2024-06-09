import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventUpdateService } from "../../update/service.ts";
import type { BirthdayUpdateModel } from "./model.ts";
import type { BirthdayUpdateFactory } from "./factory.ts";
import type { BirthdayUpdateService } from "./service.ts";

import { buildErr, buildOk } from "../../../../lang/result.ts";
import { updateBirthdayValidation } from "./validation.ts";

export class BirthdayUpdateServiceImpl implements BirthdayUpdateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly factory: BirthdayUpdateFactory,
        private readonly service: EventUpdateService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: BirthdayUpdateModel,
    ): Promise<Event> {
        const modelValidation = this.validator.validate(event, updateBirthdayValidation);
        if (modelValidation.type === "err") {
            return buildErr(modelValidation.error);
        }
        const buildedEvent = this.factory.build(event);
        return this.service.update(userId, id, buildedEvent);
    }
}

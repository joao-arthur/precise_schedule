import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { BirthdayCreateModel } from "./model.ts";
import type { BirthdayCreateFactory } from "./factory.ts";
import type { BirthdayCreateService } from "./service.ts";
import { buildErr, buildOk } from "../../../../lang/result.ts";
import { createBirthdayValidation } from "./validation.ts";

export class BirthdayCreateServiceImpl implements BirthdayCreateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly factory: BirthdayCreateFactory,
        private readonly service: EventCreateService,
    ) {}

    public create(userId: User["id"], event: BirthdayCreateModel): Promise<Event> {
        const modelValidation = this.validator.validate(event, createBirthdayValidation);
        if (modelValidation.type === "err") {
            return buildErr(modelValidation.error);
        }
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

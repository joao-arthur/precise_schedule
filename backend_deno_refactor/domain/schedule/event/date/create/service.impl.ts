import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { DateCreateModel } from "./model.ts";
import type { DateCreateService } from "./service.ts";
import type { DateCreateFactory } from "./factory.ts";
import { createDateValidation } from "./validation.ts";

export class DateCreateServiceImpl implements DateCreateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly factory: DateCreateFactory,
        private readonly service: EventCreateService,
    ) {}

    public create(userId: User["id"], event: DateCreateModel): Promise<Result<Event>> {
        const modelValidation = this.validator.validate(event, createDateValidation);
        if (modelValidation.type === "err") {
            return Promise.resolve(modelValidation);
        }
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

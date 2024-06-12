import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { DateCreateModel } from "./model.ts";
import type { DateCreateErrors, DateCreateService } from "./service.ts";
import { buildEventCreate } from "./factory.ts";
import { createDateValidation } from "./validation.ts";

export class DateCreateServiceImpl implements DateCreateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly service: EventCreateService,
    ) {}

    public create(
        userId: User["id"],
        event: DateCreateModel,
    ): Promise<Result<Event, DateCreateErrors>> {
        const validationResult = this.validator.validate(event, createDateValidation);
        if (validationResult.type === "err") {
            return Promise.resolve(validationResult);
        }
        const builtEvent = buildEventCreate(event);
        return this.service.create(userId, builtEvent);
    }
}

import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventUpdateService } from "../../update/service.ts";
import type { DateUpdateModel } from "./model.ts";
import type { DateUpdateFactory } from "./factory.ts";
import type { DateUpdateService } from "./service.ts";
import { updateDateValidation } from "./validation.ts";

export class DateUpdateServiceImpl implements DateUpdateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly factory: DateUpdateFactory,
        private readonly service: EventUpdateService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: DateUpdateModel,
    ): Promise<Result<Event>> {
        const modelValidation = this.validator.validate(event, updateDateValidation);
        if (modelValidation.type === "err") {
            return Promise.resolve(modelValidation);
        }
        const buildedEvent = this.factory.build(event);
        return this.service.update(userId, id, buildedEvent);
    }
}

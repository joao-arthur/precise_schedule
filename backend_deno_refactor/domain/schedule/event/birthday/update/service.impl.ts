import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventUpdateService } from "../../update/service.ts";
import type { BirthdayUpdateModel } from "./model.ts";
import type { BirthdayUpdateErrors, BirthdayUpdateService } from "./service.ts";
import { buildEventUpdate } from "./factory.ts";
import { updateBirthdaySchema } from "./validation.ts";

export class BirthdayUpdateServiceImpl implements BirthdayUpdateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly service: EventUpdateService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: BirthdayUpdateModel,
    ): Promise<Result<Event, BirthdayUpdateErrors>> {
        const validationResult = this.validator.validate(event, updateBirthdaySchema);
        if (validationResult.type === "err") {
            return Promise.resolve(validationResult);
        }
        const builtEvent = buildEventUpdate(event);
        return this.service.update(userId, id, builtEvent);
    }
}

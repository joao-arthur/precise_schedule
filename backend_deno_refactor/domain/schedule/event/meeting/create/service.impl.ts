import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { MeetingCreateModel } from "./model.ts";
import type { MeetingCreateFactory } from "./factory.ts";
import type { MeetingCreateService } from "./service.ts";
import { createMeetingValidation } from "./validation.ts";

export class MeetingCreateServiceImpl implements MeetingCreateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly factory: MeetingCreateFactory,
        private readonly service: EventCreateService,
    ) {}

    public create(userId: User["id"], event: MeetingCreateModel): Promise<Result<Event>> {
        const validationResult = this.validator.validate(event, createMeetingValidation);
        if (validationResult.type === "err") {
            return Promise.resolve(validationResult);
        }
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

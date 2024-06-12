import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventUpdateService } from "../../update/service.ts";
import type { MeetingUpdateModel } from "./model.ts";
import type { MeetingUpdateErrors, MeetingUpdateService } from "./service.ts";
import { buildEventUpdate } from "./factory.ts";
import { updateMeetingSchema } from "./validation.ts";

export class MeetingUpdateServiceImpl implements MeetingUpdateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly service: EventUpdateService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: MeetingUpdateModel,
    ): Promise<Result<Event, MeetingUpdateErrors>> {
        const validationResult = this.validator.validate(event, updateMeetingSchema);
        if (validationResult.type === "err") {
            return Promise.resolve(validationResult);
        }
        const builtEvent = buildEventUpdate(event);
        return this.service.update(userId, id, builtEvent);
    }
}

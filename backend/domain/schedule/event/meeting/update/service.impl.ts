import type { Validator } from "../../../../validation/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventUpdateService } from "../../update/service.ts";
import type { MeetingUpdateModel } from "./model.ts";
import type { MeetingUpdateFactory } from "./factory.ts";
import type { MeetingUpdateService } from "./service.ts";

import { updateMeetingValidation } from "./validation.ts";

export class MeetingUpdateServiceImpl implements MeetingUpdateService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: MeetingUpdateFactory,
        private readonly service: EventUpdateService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: MeetingUpdateModel,
    ): Promise<Event> {
        this.validator.validate(event, updateMeetingValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.update(userId, id, buildedEvent);
    }
}

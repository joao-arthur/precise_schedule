import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateMeetingEvent } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEvent.ts";
import type { UpdateMeetingEventFactory } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEventFactory.ts";
import type { UpdateMeetingEventService } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEventService.ts";

import { updateMeetingValidation } from "@ps/domain/schedule/event/updateMeeting/updateMeetingValidation.ts";

export class UpdateMeetingEventServiceImpl implements UpdateMeetingEventService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: UpdateMeetingEventFactory,
        private readonly service: UpdateEventService,
    ) {}

    public update(
        id: Event["id"],
        event: UpdateMeetingEvent,
    ): Promise<Event> {
        this.validator.validate(event, updateMeetingValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.update(id, buildedEvent);
    }
}

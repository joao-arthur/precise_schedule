import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateMeetingEvent } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEvent.ts";
import type { CreateMeetingEventFactory } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEventFactory.ts";
import type { CreateMeetingEventService } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEventService.ts";

import { createMeetingValidation } from "@ps/domain/schedule/event/createMeeting/createMeetingValidation.ts";

export class CreateMeetingEventServiceImpl implements CreateMeetingEventService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: CreateMeetingEventFactory,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreateMeetingEvent): Promise<Event> {
        this.validator.validate(event, createMeetingValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

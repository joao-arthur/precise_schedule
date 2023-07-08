import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateMeetingEvent } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEvent.ts";
import type { CreateMeetingEventFactory } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEventFactory.ts";
import type { CreateMeetingEventService } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEventService.ts";

export class CreateMeetingEventServiceImpl
    implements CreateMeetingEventService {
    constructor(
        private readonly factory: CreateMeetingEventFactory,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreateMeetingEvent): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

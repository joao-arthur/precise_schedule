import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateMeetingEvent } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEvent.ts";
import type { CreateMeetingEventFactoryImpl } from "../createMeeting/CreateMeetingEventFactoryImpl.ts";

export class CreateMeetingEventServiceImpl {
    constructor(
        private readonly factory: CreateMeetingEventFactoryImpl,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreateMeetingEvent): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

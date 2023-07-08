import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateMeetingEvent } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEvent.ts";
import type { UpdateMeetingEventFactory } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEventFactory.ts";
import type { UpdateMeetingEventService } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEventService.ts";

export class UpdateMeetingEventServiceImpl
    implements UpdateMeetingEventService {
    constructor(
        private readonly factory: UpdateMeetingEventFactory,
        private readonly service: UpdateEventService,
    ) {}

    public update(
        id: Event["id"],
        event: UpdateMeetingEvent,
    ): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.update(id, buildedEvent);
    }
}

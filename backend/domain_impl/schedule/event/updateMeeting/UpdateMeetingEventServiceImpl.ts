import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateMeetingEvent } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEvent.ts";
import type { UpdateMeetingEventFactoryImpl } from "../updateMeeting/UpdateMeetingEventFactoryImpl.ts";

export class UpdateMeetingEventServiceImpl {
    constructor(
        private readonly factory: UpdateMeetingEventFactoryImpl,
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

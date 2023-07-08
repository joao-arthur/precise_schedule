import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateMeetingEventService } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEventService.ts";

export class UpdateMeetingEventServiceMock
    implements UpdateMeetingEventService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

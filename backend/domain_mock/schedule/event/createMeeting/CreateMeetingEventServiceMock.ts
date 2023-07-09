import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateMeetingEventService } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEventService.ts";

export class CreateMeetingEventServiceMock implements CreateMeetingEventService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

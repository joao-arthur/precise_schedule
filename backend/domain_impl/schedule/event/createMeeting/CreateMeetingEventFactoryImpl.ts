import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreateMeetingEvent } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEvent.ts";
import type { CreateMeetingEventFactory } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEventFactory.ts";

export class CreateMeetingEventFactoryImpl implements CreateMeetingEventFactory {
    public build(event: CreateMeetingEvent): CreateEventModel {
        return {
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: "MEETING",
            frequency: event.frequency,
            weekendRepeat: event.weekendRepeat,
            user: event.user,
        };
    }
}

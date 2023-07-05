import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdateMeetingEvent } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEvent.ts";
import type { UpdateMeetingEventFactory } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEventFactory.ts";

export class UpdateMeetingEventFactoryImpl
    implements UpdateMeetingEventFactory {
    public build(event: UpdateMeetingEvent): UpdateEventModel {
        return {
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: "MEETING",
            frequency: event.frequency,
            weekendRepeat: event.weekendRepeat,
        };
    }
}

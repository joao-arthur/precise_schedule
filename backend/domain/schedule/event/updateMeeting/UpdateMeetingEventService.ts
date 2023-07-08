import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateMeetingEvent } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEvent.ts";

export type UpdateMeetingEventService = {
    readonly update: (
        id: Event["id"],
        event: UpdateMeetingEvent,
    ) => Promise<Event>;
};

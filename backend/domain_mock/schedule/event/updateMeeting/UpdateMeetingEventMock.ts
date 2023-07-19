import type { UpdateMeetingEvent } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEvent.ts";

export const updateMeetingEventMock: UpdateMeetingEvent = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    frequency: "NEVER",
    weekendRepeat: false,
    user: "user",
};

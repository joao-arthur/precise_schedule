import type { CreateEvent, MeetingEvent } from "./event";

export function buildMeetingEvent(
    event: MeetingEvent,
): CreateEvent {
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

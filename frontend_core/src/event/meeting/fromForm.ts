import type { Meeting } from "./meeting.js";
import type { MeetingForm } from "./meetingForm.js";

export function fromForm(event: MeetingForm): Meeting {
    return {
        id: event.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

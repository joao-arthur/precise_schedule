import type { Meeting } from "./meeting.js";
import type { MeetingForm } from "./meetingForm.js";

export function fromForm(event: Partial<Meeting>): Partial<MeetingForm> {
    return { ...event, repeats: event.frequency !== undefined };
}

import type { Meeting } from "./meeting.js";
import type { MeetingForm } from "./meetingForm.js";

export function toForm(event: Partial<Meeting>): Partial<MeetingForm> {
    return { ...event, repeats: event.frequency !== undefined };
}

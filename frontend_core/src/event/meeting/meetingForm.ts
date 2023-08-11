import { Meeting } from "./meeting.js";

export type MeetingForm = Meeting & {
    readonly repeats: boolean;
};

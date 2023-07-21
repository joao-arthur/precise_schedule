import type { UpdateEventModel } from "../update/UpdateEventModel.ts";
import type { UpdateMeetingEvent } from "./UpdateMeetingEvent.ts";

export type UpdateMeetingEventFactory = {
    readonly build: (event: UpdateMeetingEvent) => UpdateEventModel;
};

import type { UpdateEventModel } from "../update/UpdateEventModel.ts";
import type { UpdateMeetingEvent } from "./UpdateMeetingEvent.ts";

export type UpdateMeetingEventFactory = {
    readonly build: (
        appointEvent: UpdateMeetingEvent,
    ) => UpdateEventModel;
};

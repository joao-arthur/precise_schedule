import type { CreateEventModel } from "../create/CreateEventModel.ts";
import type { CreateMeetingEvent } from "./CreateMeetingEvent.ts";

export type CreateMeetingEventFactory = {
    readonly build: (event: CreateMeetingEvent) => CreateEventModel;
};
import type { Event } from "../Event.ts";
import type { UpdateEventModel } from "./UpdateEventModel.ts";

export type UpdateEventFactory = {
    readonly build: (event: UpdateEventModel, existingEvent: Event) => Event;
};

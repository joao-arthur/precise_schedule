import type { Event } from "../Event.ts";
import type { UpdateEventModel } from "./UpdateEventModel.ts";

export type UpdateEventService = {
    readonly update: (
        id: Event["id"],
        event: UpdateEventModel,
    ) => Promise<Event>;
};

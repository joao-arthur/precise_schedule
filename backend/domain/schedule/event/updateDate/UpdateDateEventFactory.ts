import type { UpdateEventModel } from "../update/UpdateEventModel.ts";
import type { UpdateDateEvent } from "./UpdateDateEvent.ts";

export type UpdateDateEventFactory = {
    readonly build: (
        appointEvent: UpdateDateEvent,
    ) => UpdateEventModel;
};

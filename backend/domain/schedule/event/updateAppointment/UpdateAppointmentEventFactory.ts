import type { UpdateEventModel } from "../update/UpdateEventModel.ts";
import type { UpdateAppointmentEvent } from "./UpdateAppointmentEvent.ts";

export type UpdateAppointmentEventFactory = {
    readonly build: (
        event: UpdateAppointmentEvent,
    ) => UpdateEventModel;
};

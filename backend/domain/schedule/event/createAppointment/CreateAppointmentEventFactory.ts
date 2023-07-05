import type { CreateEventModel } from "../create/CreateEventModel.ts";
import type { CreateAppointmentEvent } from "./CreateAppointmentEvent.ts";

export type CreateAppointmentEventFactory = {
    readonly build: (
        appointEvent: CreateAppointmentEvent,
    ) => CreateEventModel;
};

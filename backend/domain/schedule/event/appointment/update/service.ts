import type { User } from "../../user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateAppointmentEvent } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEvent.ts";

export type UpdateAppointmentEventService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: UpdateAppointmentEvent,
    ) => Promise<Event>;
};

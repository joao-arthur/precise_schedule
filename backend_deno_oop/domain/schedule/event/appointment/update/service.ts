import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { AppointmentUpdateModel } from "./model.ts";

export type AppointmentUpdateService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: AppointmentUpdateModel,
    ) => Promise<Event>;
};

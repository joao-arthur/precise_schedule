import type { EventCreateModel } from "../../create/model.ts";
import type { AppointmentCreateModel } from "./model.ts";

export type AppointmentCreateFactory = {
    readonly build: (event: AppointmentCreateModel) => EventCreateModel;
};

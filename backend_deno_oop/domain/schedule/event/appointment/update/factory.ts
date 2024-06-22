import type { EventUpdateModel } from "../../update/model.ts";
import type { AppointmentUpdateModel } from "./model.ts";

export type AppointmentUpdateFactory = {
    readonly build: (event: AppointmentUpdateModel) => EventUpdateModel;
};

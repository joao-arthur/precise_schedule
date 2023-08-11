import { Appointment } from "./appointment.js";

export type AppointmentForm = Appointment & {
    readonly repeats: boolean;
};

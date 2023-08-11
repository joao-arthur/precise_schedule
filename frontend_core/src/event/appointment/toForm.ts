import type { Appointment } from "./appointment.js";
import type { AppointmentForm } from "./appointmentForm.js";

export function toForm(event: Partial<Appointment>): Partial<AppointmentForm> {
    return { ...event, repeats: event.frequency !== undefined };
}

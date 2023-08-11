import type { Appointment } from "./appointment.js";
import type { AppointmentForm } from "./appointmentForm.js";

export function fromForm(event: Partial<Appointment>): Partial<AppointmentForm> {
    return { ...event, repeats: event.frequency !== undefined };
}

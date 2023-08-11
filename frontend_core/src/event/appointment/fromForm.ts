import type { Appointment } from "./appointment.js";
import type { AppointmentForm } from "./appointmentForm.js";

export function fromForm(event: AppointmentForm): Appointment {
    return {
        id: event.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        frequency: event.repeats ? event.frequency : undefined,
        weekendRepeat: event.weekendRepeat,
    };
}

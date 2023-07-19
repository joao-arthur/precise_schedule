import type { UpdateAppointmentEvent } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEvent.ts";

export const updateAppointmentEventMock: UpdateAppointmentEvent = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    frequency: "NEVER",
    weekendRepeat: false,
    user: "user",
};

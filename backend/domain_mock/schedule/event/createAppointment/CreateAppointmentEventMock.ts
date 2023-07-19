import type { CreateAppointmentEvent } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEvent.ts";

export const createAppointmentEventMock: CreateAppointmentEvent = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    frequency: "NEVER",
    weekendRepeat: false,
    user: "user",
};

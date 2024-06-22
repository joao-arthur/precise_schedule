import type { EventCreate } from "../create.ts";
import type { EventUpdate } from "../update.ts";
import type { Event } from "../model.ts";
import type { EventInfo } from "../read.ts";
import type { AppointmentCreate } from "./create.ts";
import type { AppointmentUpdate } from "./update.ts";

export const appointmentCreateStub: AppointmentCreate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    frequency: "1W",
    weekendRepeat: true,
};

export const appointmentEventCreateStub: EventCreate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "APPOINTMENT",
    frequency: "1W",
    weekendRepeat: true,
};

export const appointmentStub: Event = {
    id: "appointment-id",
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "APPOINTMENT",
    frequency: "1W",
    weekendRepeat: true,
    user: "user-id",
    createdAt: new Date("2024-06-16T19:16:12.327Z"),
    updatedAt: new Date("2024-06-16T19:16:12.327Z"),
};

export const appointmentInfoStub: EventInfo = {
    id: "appointment-id",
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "APPOINTMENT",
    frequency: "1W",
    weekendRepeat: true,
};

export const appointmentUpdateStub: AppointmentUpdate = {
    name: "name",
    day: "2025-07-27",
    begin: "10:00",
    end: "16:00",
    frequency: "1Y",
    weekendRepeat: false,
};

export const appointmentEventUpdateStub: EventUpdate = {
    name: "name",
    day: "2025-07-27",
    begin: "10:00",
    end: "16:00",
    category: "APPOINTMENT",
    frequency: "1Y",
    weekendRepeat: false,
};

export const appointmentUpdatedStub: Event = {
    id: "appointment-id",
    name: "name",
    day: "2025-07-27",
    begin: "10:00",
    end: "16:00",
    category: "APPOINTMENT",
    frequency: "1Y",
    weekendRepeat: false,
    user: "user-id",
    createdAt: new Date("2024-06-16T19:16:12.327Z"),
    updatedAt: new Date("2025-07-18T15:43:12.377Z"),
};

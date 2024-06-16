import type { EventCreate } from "../create.ts";
import type { EventUpdate } from "../update.ts";
import type { Event } from "../model.ts";
import type { EventInfo } from "../read.ts";
import type { DateCreate } from "./create.ts";
import type { DateUpdate } from "./update.ts";

export const dateCreateStub: DateCreate = {
    name: "date Jullia",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
};

export const dateEventCreateStub: EventCreate = {
    name: "date Jullia",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "DATE",
    frequency: undefined,
    weekendRepeat: false,
};

export const dateStub: Event = {
    id: "date-id",
    name: "date Jullia",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "DATE",
    frequency: undefined,
    weekendRepeat: false,
    user: "user-id",
    createdAt: new Date("2024-06-16T19:16:12.327Z"),
    updatedAt: new Date("2024-06-16T19:16:12.327Z"),
};

export const dateInfoStub: EventInfo = {
    id: "date-id",
    name: "date Jullia",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "DATE",
    frequency: undefined,
    weekendRepeat: false,
};

export const dateUpdateStub: DateUpdate = {
    name: "date Jullia",
    day: "2025-07-27",
    begin: "08:00",
    end: "18:00",
};

export const dateEventUpdateStub: EventUpdate = {
    name: "date Jullia",
    day: "2025-07-27",
    begin: "08:00",
    end: "18:00",
    category: "DATE",
    frequency: undefined,
    weekendRepeat: false,
};

export const dateUpdatedStub: Event = {
    id: "date-id",
    name: "date Jullia",
    day: "2025-07-27",
    begin: "08:00",
    end: "18:00",
    category: "DATE",
    frequency: undefined,
    weekendRepeat: false,
    user: "user-id",
    createdAt: new Date("2024-06-16T19:16:12.327Z"),
    updatedAt: new Date("2025-07-18T15:43:12.377Z"),
};

import type { EventCreate } from "../create.ts";
import type { EventUpdate } from "../update.ts";
import type { Event } from "../model.ts";
import type { EventInfo } from "../read.ts";
import type { DateCreate } from "./create.ts";
import type { DateUpdate } from "./update.ts";

export const dateCreateStub: DateCreate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
};

export const dateUpdateStub: DateUpdate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
};

export const dateEventCreateStub: EventCreate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "DATE",
    frequency: undefined,
    weekendRepeat: false,
};

export const dateEventUpdateStub: EventUpdate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "DATE",
    frequency: undefined,
    weekendRepeat: false,
};

export const dateStub: Event = {
    id: "date-id",
    name: "name",
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
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "DATE",
    frequency: undefined,
    weekendRepeat: false,
};

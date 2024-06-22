import type { EventCreate } from "../create.ts";
import type { EventUpdate } from "../update.ts";
import type { Event } from "../model.ts";
import type { EventInfo } from "../read.ts";
import type { BirthdayCreate } from "./create.ts";
import type { BirthdayUpdate } from "./update.ts";

export const birthdayCreateStub: BirthdayCreate = {
    name: "Arthur's birthday",
    day: "2025-06-24",
};

export const birthdayEventCreateStub: EventCreate = {
    name: "Arthur's birthday",
    day: "2025-06-24",
    begin: "00:00",
    end: "23:59",
    category: "BIRTHDAY",
    frequency: "1Y",
    weekendRepeat: false,
};

export const birthdayStub: Event = {
    id: "birthday-id",
    name: "Arthur's birthday",
    day: "2025-06-24",
    begin: "00:00",
    end: "23:59",
    category: "BIRTHDAY",
    frequency: "1Y",
    weekendRepeat: false,
    user: "user-id",
    createdAt: new Date("2024-06-16T19:16:12.327Z"),
    updatedAt: new Date("2024-06-16T19:16:12.327Z"),
};

export const birthdayInfoStub: EventInfo = {
    id: "birthday-id",
    name: "Arthur's birthday",
    day: "2025-06-24",
    begin: "00:00",
    end: "23:59",
    category: "BIRTHDAY",
    frequency: "1Y",
    weekendRepeat: false,
};

export const birthdayUpdateStub: BirthdayUpdate = {
    name: "Arthur's birthday",
    day: "2025-07-27",
};

export const birthdayEventUpdateStub: EventUpdate = {
    name: "Arthur's birthday",
    day: "2025-07-27",
    begin: "00:00",
    end: "23:59",
    category: "BIRTHDAY",
    frequency: "1Y",
    weekendRepeat: false,
};

export const birthdayUpdatedStub: Event = {
    id: "birthday-id",
    name: "Arthur's birthday",
    day: "2025-07-27",
    begin: "00:00",
    end: "23:59",
    category: "BIRTHDAY",
    frequency: "1Y",
    weekendRepeat: false,
    user: "user-id",
    createdAt: new Date("2024-06-16T19:16:12.327Z"),
    updatedAt: new Date("2025-07-18T15:43:12.377Z"),
};

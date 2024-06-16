import type { EventCreate } from "../create.ts";
import type { EventUpdate } from "../update.ts";
import type { Event } from "../model.ts";
import type { EventInfo } from "../read.ts";
import type { PartyCreate } from "./create.ts";
import type { PartyUpdate } from "./update.ts";

export const partyCreateStub: PartyCreate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
};

export const partyUpdateStub: PartyUpdate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
};

export const partyEventCreateStub: EventCreate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "PARTY",
    frequency: undefined,
    weekendRepeat: false,
};

export const partyEventUpdateStub: EventUpdate = {
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "PARTY",
    frequency: undefined,
    weekendRepeat: false,
};

export const partyStub: Event = {
    id: "party-id",
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "PARTY",
    frequency: undefined,
    weekendRepeat: false,
    user: "user-id",
    createdAt: new Date("2024-06-16T19:16:12.327Z"),
    updatedAt: new Date("2024-06-16T19:16:12.327Z"),
};

export const partyInfoStub: EventInfo = {
    id: "party-id",
    name: "name",
    day: "2025-06-24",
    begin: "08:00",
    end: "18:00",
    category: "PARTY",
    frequency: undefined,
    weekendRepeat: false,
};

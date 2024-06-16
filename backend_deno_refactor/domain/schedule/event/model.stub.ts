import type { Event } from "./model.ts";

export const eventStub: Event = {
    id: "event-id",
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    category: "APPOINTMENT",
    frequency: undefined,
    weekendRepeat: false,
    user: "user-id",
    createdAt: new Date(),
    updatedAt: new Date(),
};

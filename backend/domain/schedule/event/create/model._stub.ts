import type { EventCreateModel } from "./model.ts";

export const createEventModelStub: EventCreateModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    category: "APPOINTMENT",
    frequency: undefined,
    weekendRepeat: false,
};

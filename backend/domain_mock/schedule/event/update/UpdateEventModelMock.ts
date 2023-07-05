import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";

export const updateEventModelMock: UpdateEventModel = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    category: "APPOINTMENT",
    frequency: "NEVER",
    weekendRepeat: false,
};

import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";

export const updateEventModelMock: UpdateEventModel = {
    name: "name",
    begin: new Date("2023-06-24T08:00:00.000Z"),
    end: new Date("2023-06-24T18:00:00.000Z"),
};

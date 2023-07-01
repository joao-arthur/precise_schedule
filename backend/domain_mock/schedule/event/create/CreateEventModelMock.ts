import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";

export const createEventModelMock: CreateEventModel = {
    name: "name",
    begin: new Date("2023-06-24T08:00:00.000Z"),
    end: new Date("2023-06-24T18:00:00.000Z"),
};

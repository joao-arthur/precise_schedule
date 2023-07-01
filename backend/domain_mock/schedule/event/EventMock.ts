import type { Event } from "@ps/domain/schedule/event/Event.ts";

export const eventMock: Event = {
    id: "id",
    name: "name",
    begin: new Date("2023-06-24T08:00:00.000Z"),
    end: new Date("2023-06-24T18:00:00.000Z"),
};

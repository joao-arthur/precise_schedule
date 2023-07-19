import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";

export const updatePartyEventMock: UpdatePartyEvent = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
    user: "user",
};

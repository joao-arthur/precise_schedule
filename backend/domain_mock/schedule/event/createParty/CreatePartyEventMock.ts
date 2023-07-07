import type { CreatePartyEvent } from "@ps/domain/schedule/event/createParty/CreatePartyEvent.ts";

export const createPartyEventMock: CreatePartyEvent = {
    name: "name",
    day: "2023-06-24",
    begin: "08:00",
    end: "18:00",
};

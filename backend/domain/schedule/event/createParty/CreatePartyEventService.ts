import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreatePartyEvent } from "@ps/domain/schedule/event/createParty/CreatePartyEvent.ts";

export type CreatePartyEventService = {
    readonly create: (
        event: CreatePartyEvent,
    ) => Promise<Event>;
};

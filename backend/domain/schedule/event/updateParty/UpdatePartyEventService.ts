import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";

export type UpdatePartyEventService = {
    readonly update: (
        id: Event["id"],
        event: UpdatePartyEvent,
    ) => Promise<Event>;
};

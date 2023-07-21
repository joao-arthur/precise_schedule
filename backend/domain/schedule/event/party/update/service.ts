import type { User } from "../../user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";

export type UpdatePartyEventService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: UpdatePartyEvent,
    ) => Promise<Event>;
};

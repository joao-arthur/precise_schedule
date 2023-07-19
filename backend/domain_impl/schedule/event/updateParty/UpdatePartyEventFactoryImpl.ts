import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";
import type { UpdatePartyEventFactory } from "@ps/domain/schedule/event/updateParty/UpdatePartyEventFactory.ts";

export class UpdatePartyEventFactoryImpl implements UpdatePartyEventFactory {
    public build(event: UpdatePartyEvent): UpdateEventModel {
        return {
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: "PARTY",
            frequency: "NEVER",
            weekendRepeat: false,
            user: event.user,
        };
    }
}

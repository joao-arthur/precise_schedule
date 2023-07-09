import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreatePartyEvent } from "@ps/domain/schedule/event/createParty/CreatePartyEvent.ts";
import type { CreatePartyEventFactory } from "@ps/domain/schedule/event/createParty/CreatePartyEventFactory.ts";

export class CreatePartyEventFactoryImpl implements CreatePartyEventFactory {
    public build(event: CreatePartyEvent): CreateEventModel {
        return {
            name: event.name,
            day: event.day,
            begin: event.begin,
            end: event.end,
            category: "PARTY",
            frequency: "NEVER",
            weekendRepeat: false,
        };
    }
}

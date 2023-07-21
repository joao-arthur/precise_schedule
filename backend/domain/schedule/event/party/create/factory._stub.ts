import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { CreatePartyEventFactory } from "@ps/domain/schedule/event/createParty/CreatePartyEventFactory.ts";

export class CreatePartyEventFactoryMock implements CreatePartyEventFactory {
    constructor(private readonly event: CreateEventModel) {}

    public build(): CreateEventModel {
        return this.event;
    }
}

import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdatePartyEventFactory } from "@ps/domain/schedule/event/updateParty/UpdatePartyEventFactory.ts";

export class UpdatePartyEventFactoryMock implements UpdatePartyEventFactory {
    constructor(private readonly event: UpdateEventModel) {}

    public build(): UpdateEventModel {
        return this.event;
    }
}

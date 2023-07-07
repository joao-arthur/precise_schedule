import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";
import type { UpdatePartyEventFactoryImpl } from "../updateParty/UpdatePartyEventFactoryImpl.ts";

export class UpdatePartyEventServiceImpl {
    constructor(
        private readonly factory: UpdatePartyEventFactoryImpl,
        private readonly service: UpdateEventService,
    ) {}

    public update(
        id: Event["id"],
        event: UpdatePartyEvent,
    ): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.update(id, buildedEvent);
    }
}

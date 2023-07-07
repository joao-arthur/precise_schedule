import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateDateEvent } from "@ps/domain/schedule/event/updateDate/UpdateDateEvent.ts";
import type { UpdateDateEventFactoryImpl } from "../updateDate/UpdateDateEventFactoryImpl.ts";

export class UpdateDateEventServiceImpl {
    constructor(
        private readonly factory: UpdateDateEventFactoryImpl,
        private readonly service: UpdateEventService,
    ) {}

    public update(
        id: Event["id"],
        event: UpdateDateEvent,
    ): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.update(id, buildedEvent);
    }
}

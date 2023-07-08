import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateDateEvent } from "@ps/domain/schedule/event/updateDate/UpdateDateEvent.ts";
import type { UpdateDateEventFactory } from "@ps/domain/schedule/event/updateDate/UpdateDateEventFactory.ts";
import type { UpdateDateEventService } from "@ps/domain/schedule/event/updateDate/UpdateDateEventService.ts";

export class UpdateDateEventServiceImpl
    implements UpdateDateEventService {
    constructor(
        private readonly factory: UpdateDateEventFactory,
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

import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindService } from "../find/service.ts";
import type { EventUpdateModel } from "./model.ts";
import type { EventUpdateService } from "./service.ts";
import type { EventUpdateFactory } from "./factory.ts";
import type { EventUpdateRepository } from "./repository.ts";

export class EventUpdateServiceImpl implements EventUpdateService {
    constructor(
        private readonly repository: EventUpdateRepository,
        private readonly factory: EventUpdateFactory,
        private readonly eventFindService: EventFindService,
    ) {}

    public async update(
        userId: User["id"],
        id: Event["id"],
        event: EventUpdateModel,
    ): Promise<Event> {
        const existingEvent = await this.eventFindService.findByUserAndId(userId, id);
        const buildedEvent = this.factory.build(event, existingEvent);
        await this.repository.update(buildedEvent);
        return buildedEvent;
    }
}

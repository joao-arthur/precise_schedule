import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { FindEventService } from "@ps/domain/schedule/event/find/FindEventService.ts";
import type { FindEventRepository } from "@ps/domain/schedule/event/find/FindEventRepository.ts";

import { EventNotFound } from "@ps/domain/schedule/event/find/EventNotFound.ts";

export class FindEventServiceImpl implements FindEventService {
    constructor(private readonly repository: FindEventRepository) {}

    public findById(id: Event["id"]): Event {
        const maybeEvent = this.repository.findById(id);
        if (!maybeEvent) {
            throw new EventNotFound();
        }
        return maybeEvent;
    }
}

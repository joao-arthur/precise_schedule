import type { User } from "@ps/domain/schedule/user/User.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { FindEventService } from "@ps/domain/schedule/event/find/FindEventService.ts";
import type { FindEventRepository } from "@ps/domain/schedule/event/find/FindEventRepository.ts";

import { EventNotFound } from "@ps/domain/schedule/event/find/EventNotFound.ts";

export class FindEventServiceImpl implements FindEventService {
    constructor(private readonly repository: FindEventRepository) {}

    public async findByUserAndId(userId: User["id"], id: Event["id"]): Promise<Event> {
        const maybeEvent = await this.repository.findByUserAndId(userId, id);
        if (!maybeEvent) {
            throw new EventNotFound();
        }
        return maybeEvent;
    }
}

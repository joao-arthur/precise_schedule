import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindService } from "./service.ts";
import type { EventFindRepository } from "./repository.ts";

import { EventNotFound } from "./EventNotFound.ts";

export class EventFindServiceImpl implements EventFindService {
    constructor(private readonly repository: EventFindRepository) {}

    public findByUser(userId: User["id"]): Promise<Event[]> {
        return this.repository.findByUser(userId);
    }

    public async findByUserAndId(userId: User["id"], id: Event["id"]): Promise<Event> {
        const maybeEvent = await this.repository.findByUserAndId(userId, id);
        if (!maybeEvent) {
            throw new EventNotFound();
        }
        return maybeEvent;
    }
}

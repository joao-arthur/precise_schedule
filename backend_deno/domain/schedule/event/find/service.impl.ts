import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindService } from "./service.ts";
import type { EventFindFactory } from "./factory.ts";
import type { EventFindRepository } from "./repository.ts";
import type { EventFindModel } from "./model.ts";
import { EventNotFound } from "./error.eventNotFound.ts";

export class EventFindServiceImpl implements EventFindService {
    constructor(
        private readonly factory: EventFindFactory,
        private readonly repository: EventFindRepository,
    ) {}

    public findByUser(userId: User["id"]): Promise<Event[]> {
        return this.repository.findByUser(userId);
    }

    public async findByUserMapped(userId: User["id"]): Promise<EventFindModel[]> {
        return (await this.findByUser(userId)).map((event) => this.factory.build(event));
    }

    public async findByUserAndId(userId: User["id"], id: Event["id"]): Promise<Event> {
        const maybeEvent = await this.repository.findByUserAndId(userId, id);
        if (!maybeEvent) {
            throw new EventNotFound();
        }
        return maybeEvent;
    }

    public async findByUserAndIdMapped(
        userId: User["id"],
        id: Event["id"],
    ): Promise<EventFindModel> {
        return this.factory.build(await this.findByUserAndId(userId, id));
    }
}

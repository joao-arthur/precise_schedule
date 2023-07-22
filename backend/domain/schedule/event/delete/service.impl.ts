import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindService } from "../find/service.ts";
import type { EventDeleteService } from "./service.ts";
import type { EventDeleteRepository } from "./repository.ts";

export class EventDeleteServiceImpl implements EventDeleteService {
    constructor(
        private readonly repository: EventDeleteRepository,
        private readonly eventFindService: EventFindService,
    ) {}

    public async del(userId: User["id"], id: Event["id"]): Promise<void> {
        await this.eventFindService.findByUserAndId(userId, id);
        await this.repository.del(id);
    }
}

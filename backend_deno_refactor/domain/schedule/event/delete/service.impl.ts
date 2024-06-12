import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindService } from "../find/service.ts";
import type { EventDeleteRepository } from "./repository.ts";
import type { EventDeleteErrors, EventDeleteService } from "./service.ts";
import { buildOk } from "../../../lang/result.ts";

export class EventDeleteServiceImpl implements EventDeleteService {
    constructor(
        private readonly repository: EventDeleteRepository,
        private readonly eventFindService: EventFindService,
    ) {}

    public async del(
        userId: User["id"],
        id: Event["id"],
    ): Promise<Result<void, EventDeleteErrors>> {
        const existingEventResult = await this.eventFindService.findByUserAndId(userId, id);
        if (existingEventResult.type === "err") {
            return existingEventResult;
        }
        const deleteResult = await this.repository.del(id);
        if (deleteResult.type === "err") {
            return deleteResult;
        }
        return buildOk(undefined);
    }
}

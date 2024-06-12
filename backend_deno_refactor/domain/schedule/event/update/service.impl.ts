import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindService } from "../find/service.ts";
import type { EventUpdateModel } from "./model.ts";
import type { EventUpdateRepository } from "./repository.ts";
import type { EventUpdateErrors, EventUpdateService } from "./service.ts";
import { buildEvent } from "./factory.ts";
import { ok } from "../../../lang/result.ts";

export class EventUpdateServiceImpl implements EventUpdateService {
    constructor(
        private readonly repository: EventUpdateRepository,
        private readonly eventFindService: EventFindService,
    ) {}

    public async update(
        userId: User["id"],
        id: Event["id"],
        event: EventUpdateModel,
    ): Promise<Result<Event, EventUpdateErrors>> {
        const existingEventResult = await this.eventFindService.findByUserAndId(userId, id);
        if (existingEventResult.type === "err") {
            return existingEventResult;
        }
        const builtEvent = buildEvent(event, existingEventResult.data);
        const updateResult = await this.repository.update(builtEvent);
        if (updateResult.type === "err") {
            return updateResult;
        }
        return ok(builtEvent);
    }
}

import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindService } from "../find/service.ts";
import type { EventUpdateModel } from "./model.ts";
import type { EventUpdateFactory } from "./factory.ts";
import type { EventUpdateRepository } from "./repository.ts";
import type { EventUpdateErrors, EventUpdateService } from "./service.ts";
import { buildOk } from "../../../lang/result.ts";

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
    ): Promise<Result<Event, EventUpdateErrors>> {
        const existingEventResult = await this.eventFindService.findByUserAndId(userId, id);
        if (existingEventResult.type === "err") {
            return existingEventResult;
        }
        const builtEvent = this.factory.build(event, existingEventResult.data);
        const updateResult = await this.repository.update(builtEvent);
        if (updateResult.type === "err") {
            return updateResult;
        }
        return buildOk(builtEvent);
    }
}

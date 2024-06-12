import type { IdGenerator } from "../../../generator/id/service.ts";
import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventCreateModel } from "./model.ts";
import type { EventCreateRepository } from "./repository.ts";
import type { EventCreateErrors, EventCreateService } from "./service.ts";
import { ok } from "../../../lang/result.ts";
import { buildEvent } from "./factory.ts";

export class EventCreateServiceImpl implements EventCreateService {
    constructor(
        private readonly repository: EventCreateRepository,
        private readonly idGenerator: IdGenerator,
    ) {}

    public async create(
        userId: User["id"],
        event: EventCreateModel,
    ): Promise<Result<Event, EventCreateErrors>> {
        const id = this.idGenerator.generate();
        const builtEvent = buildEvent(event, userId, id);
        const createResult = await this.repository.create(builtEvent);
        if (createResult.type === "err") {
            return createResult;
        }
        return ok(builtEvent);
    }
}

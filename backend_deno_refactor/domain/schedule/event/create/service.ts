import type { IdGenerator } from "../../../generator/id/service.ts";
import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventCreateModel } from "./model.ts";
import type { EventCreateRepository } from "./repository.ts";
import { ok } from "../../../lang/result.ts";
import { buildEvent } from "./factory.ts";

type EventCreateErrors = RepositoryError;

export async function eventCreate(
    repository: EventCreateRepository,
    idGenerator: IdGenerator,
    event: EventCreateModel,
    userId: User["id"],
): Promise<Result<Event, EventCreateErrors>> {
    const eventId = idGenerator.generate();
    const builtEvent = buildEvent(event, eventId, userId);
    const createResult = await repository.create(builtEvent);
    if (createResult.type === "err") {
        return createResult;
    }
    return ok(builtEvent);
}

import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { EventNotFound } from "../find/error.eventNotFound.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventUpdateModel } from "./model.ts";
import type { EventUpdateRepository } from "./repository.ts";
import { eventFindByUserAndId } from "../find/service.ts";
import { buildEvent } from "./factory.ts";
import { ok } from "../../../lang/result.ts";

export type EventUpdateErrors =
    | RepositoryError
    | EventNotFound;

export async function eventUpdate(
    repository: EventUpdateRepository,
    userId: User["id"],
    eventId: Event["id"],
    event: EventUpdateModel,
): Promise<Result<Event, EventUpdateErrors>> {
    const existingEventResult = await eventFindByUserAndId(repository, userId, eventId);
    if (existingEventResult.type === "err") {
        return existingEventResult;
    }
    const builtEvent = buildEvent(event, existingEventResult.data);
    const updateResult = await repository.update(builtEvent);
    if (updateResult.type === "err") {
        return updateResult;
    }
    return ok(builtEvent);
}

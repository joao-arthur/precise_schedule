import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { EventNotFound } from "../find/error.eventNotFound.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventDeleteRepository } from "./repo.ts";
import { eventFindByUserAndId } from "../find/service.ts";
import { ok } from "../../../lang/result.ts";

type EventDeleteErrors =
    | RepositoryError
    | EventNotFound;

export async function eventDelete(
    repo: EventDeleteRepository,
    userId: User["id"],
    eventId: Event["id"],
): Promise<Result<void, EventDeleteErrors>> {
    const existingEventResult = await eventFindByUserAndId(repo, userId, eventId);
    if (existingEventResult.type === "err") {
        return existingEventResult;
    }
    const deleteResult = await repo.del(eventId);
    if (deleteResult.type === "err") {
        return deleteResult;
    }
    return ok(undefined);
}

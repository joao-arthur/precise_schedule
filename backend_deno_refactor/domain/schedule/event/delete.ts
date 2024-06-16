import type { Result } from "../../lang/result.ts";
import type { RepositoryError } from "../../repository/RepositoryError.ts";
import type { EventNotFound } from "./read.ts";
import type { User } from "../user/model.ts";
import type { EventRepo } from "./repo.ts";
import type { Event } from "./model.ts";
import { ok } from "../../lang/result.ts";
import { eventReadByUserAndId } from "./read.ts";

type EventDeleteErrors =
    | RepositoryError
    | EventNotFound;

export async function eventDelete(
    repo: EventRepo,
    userId: User["id"],
    eventId: Event["id"],
): Promise<Result<void, EventDeleteErrors>> {
    const existingEventResult = await eventReadByUserAndId(repo, userId, eventId);
    if (existingEventResult.type === "err") {
        return existingEventResult;
    }
    const deleteResult = await repo.cDelete(eventId);
    if (deleteResult.type === "err") {
        return deleteResult;
    }
    return ok(undefined);
}

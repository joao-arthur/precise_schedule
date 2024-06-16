import type { Result } from "../../../lang/result.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindRepository } from "./repo.ts";
import type { EventFindModel } from "./model.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import { err, ok } from "../../../lang/result.ts";
import { buildEventFind } from "./factory.ts";
import { EventNotFound } from "./error.eventNotFound.ts";

type FindByUserErrors = RepositoryError;
type FindByUserAndIdErrors = RepositoryError | EventNotFound;

export function eventFindByUser(
    repo: EventFindRepository,
    userId: User["id"],
): Promise<Result<readonly Event[], FindByUserErrors>> {
    return repo.readByUser(userId);
}

export async function eventFindByUserMapped(
    repo: EventFindRepository,
    userId: User["id"],
): Promise<Result<readonly EventFindModel[], FindByUserErrors>> {
    const foundUsersResult = await repo.readByUser(userId);
    if (foundUsersResult.type === "err") {
        return foundUsersResult;
    }
    const mapped = foundUsersResult.data.map(buildEventFind);
    return ok(mapped);
}

export async function eventFindByUserAndId(
    repo: EventFindRepository,
    userId: User["id"],
    eventId: Event["id"],
): Promise<Result<Event, FindByUserAndIdErrors>> {
    const maybeEventResult = await repo.readByUserAndId(userId, eventId);
    if (maybeEventResult.type === "err") {
        return maybeEventResult;
    }
    if (maybeEventResult.data === undefined) {
        return err(new EventNotFound());
    }
    return ok(maybeEventResult.data);
}

export async function eventFindByUserAndIdMapped(
    repo: EventFindRepository,
    userId: User["id"],
    eventId: Event["id"],
): Promise<Result<EventFindModel, FindByUserAndIdErrors>> {
    const maybeEventResult = await repo.readByUserAndId(userId, eventId);
    if (maybeEventResult.type === "err") {
        return maybeEventResult;
    }
    if (maybeEventResult.data === undefined) {
        return err(new EventNotFound());
    }
    const builtEvent = buildEventFind(maybeEventResult.data);
    return ok(builtEvent);
}

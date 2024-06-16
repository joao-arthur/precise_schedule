import type { Result } from "../../lang/result.ts";
import type { RepositoryError } from "../../repository/RepositoryError.ts";
import type { User } from "../user/model.ts";
import type { EventRepo } from "./repo.ts";
import type { Event } from "./model.ts";
import { err, ok } from "../../lang/result.ts";

export class EventNotFound extends Error {
    constructor() {
        super("The event was not found!");
    }
}

export type EventFindModel = {
    readonly id: Event["id"];
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly category: Event["category"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export function eventToEventFind(event: Event): EventFindModel {
    return {
        id: event.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: event.category,
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

type FindByUserErrors = RepositoryError;
type FindByUserAndIdErrors = RepositoryError | EventNotFound;

export function eventReadByUser(
    repo: EventRepo,
    userId: User["id"],
): Promise<Result<readonly Event[], FindByUserErrors>> {
    return repo.cReadByUser(userId);
}

export async function eventReadByUserMapped(
    repo: EventRepo,
    userId: User["id"],
): Promise<Result<readonly EventFindModel[], FindByUserErrors>> {
    const foundUsersResult = await repo.cReadByUser(userId);
    if (foundUsersResult.type === "err") {
        return foundUsersResult;
    }
    const mapped = foundUsersResult.data.map(eventToEventFind);
    return ok(mapped);
}

export async function eventReadByUserAndId(
    repo: EventRepo,
    userId: User["id"],
    eventId: Event["id"],
): Promise<Result<Event, FindByUserAndIdErrors>> {
    const maybeEventResult = await repo.cReadByUserAndEventId(userId, eventId);
    if (maybeEventResult.type === "err") {
        return maybeEventResult;
    }
    if (maybeEventResult.data === undefined) {
        return err(new EventNotFound());
    }
    return ok(maybeEventResult.data);
}

export async function eventReadByUserAndIdMapped(
    repo: EventRepo,
    userId: User["id"],
    eventId: Event["id"],
): Promise<Result<EventFindModel, FindByUserAndIdErrors>> {
    const maybeEventResult = await repo.cReadByUserAndEventId(userId, eventId);
    if (maybeEventResult.type === "err") {
        return maybeEventResult;
    }
    if (maybeEventResult.data === undefined) {
        return err(new EventNotFound());
    }
    const builtEvent = eventToEventFind(maybeEventResult.data);
    return ok(builtEvent);
}

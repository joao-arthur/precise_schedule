import type { Result } from "../../lang/result.ts";
import type { RepoError } from "../../repo.ts";
import type { User } from "../user/model.ts";
import type { EventRepo } from "./repo.ts";
import type { Event } from "./model.ts";
import { err, ok } from "../../lang/result.ts";
import { BusinessError } from "../../general.ts";

export class EventNotFound extends BusinessError {
    constructor() {
        super("The event was not found!");
    }
}

export type EventInfo = {
    readonly id: Event["id"];
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly category: Event["category"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export function eventToEventInfo(event: Event): EventInfo {
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

type ReadByUserErrors = RepoError;
type ReadByUserAndIdErrors = RepoError | EventNotFound;

export function eventReadMany(
    repo: EventRepo,
    userId: User["id"],
): Promise<Result<readonly Event[], ReadByUserErrors>> {
    return repo.cReadMany(userId);
}

export async function eventReadOne(
    repo: EventRepo,
    userId: User["id"],
    eventId: Event["id"],
): Promise<Result<Event, ReadByUserAndIdErrors>> {
    const maybeEventResult = await repo.cReadOne(userId, eventId);
    if (maybeEventResult.type === "err") {
        return maybeEventResult;
    }
    if (maybeEventResult.data === undefined) {
        return err(new EventNotFound());
    }
    return ok(maybeEventResult.data);
}

export async function eventInfoReadManyService(
    repo: EventRepo,
    userId: User["id"],
): Promise<Result<readonly EventInfo[], ReadByUserErrors>> {
    const readResult = await eventReadMany(repo, userId);
    if (readResult.type === "err") {
        return readResult;
    }
    const mapped = readResult.data.map(eventToEventInfo);
    return ok(mapped);
}

export async function eventInfoReadOneService(
    repo: EventRepo,
    userId: User["id"],
    eventId: Event["id"],
): Promise<Result<EventInfo, ReadByUserAndIdErrors>> {
    const readResult = await eventReadOne(repo, userId, eventId);
    if (readResult.type === "err") {
        return readResult;
    }
    const builtEvent = eventToEventInfo(readResult.data);
    return ok(builtEvent);
}

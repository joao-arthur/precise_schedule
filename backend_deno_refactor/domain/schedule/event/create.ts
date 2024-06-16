import type { IdGenerator } from "../../generator/id.ts";
import type { DateGenerator } from "../../generator/date.ts";
import type { RepoError } from "../../repository/repo.ts";
import type { Result } from "../../lang/result.ts";
import type { User } from "../user/model.ts";
import type { EventRepo } from "./repo.ts";
import type { Event } from "./model.ts";
import { ok } from "../../lang/result.ts";

export type EventCreate = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly category: Event["category"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export function eventCreateToEvent(
    event: EventCreate,
    eventId: Event["id"],
    userId: User["id"],
    now: Date,
): Event {
    return {
        id: eventId,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: event.category,
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
        user: userId,
        createdAt: now,
        updatedAt: now,
    };
}

type EventCreateErrors = RepoError;

export async function eventCreate(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    event: EventCreate,
    userId: User["id"],
): Promise<Result<Event, EventCreateErrors>> {
    const eventId = idGenerator.gen();
    const now = dateGenerator.gen();
    const builtEvent = eventCreateToEvent(event, eventId, userId, now);
    const createResult = await repo.cCreate(builtEvent);
    if (createResult.type === "err") {
        return createResult;
    }
    return ok(builtEvent);
}

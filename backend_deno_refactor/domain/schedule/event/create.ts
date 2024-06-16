import type { IdGenerator } from "../../generator/id.ts";
import type { RepositoryError } from "../../repository/RepositoryError.ts";
import type { Result } from "../../lang/result.ts";
import type { User } from "../user/model.ts";
import type { EventRepo } from "./repo.ts";
import type { Event } from "./model.ts";
import { ok } from "../../lang/result.ts";

export type EventCreateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly category: Event["category"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export function eventCreateToEvent(
    event: EventCreateModel,
    eventId: Event["id"],
    userId: User["id"],
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
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}

type EventCreateErrors = RepositoryError;

export async function eventCreate(
    repo: EventRepo,
    idGenerator: IdGenerator,
    event: EventCreateModel,
    userId: User["id"],
): Promise<Result<Event, EventCreateErrors>> {
    const eventId = idGenerator.generate();
    const builtEvent = eventCreateToEvent(event, eventId, userId);
    const createResult = await repo.cCreate(builtEvent);
    if (createResult.type === "err") {
        return createResult;
    }
    return ok(builtEvent);
}

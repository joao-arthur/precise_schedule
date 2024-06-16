import type { Result } from "../../lang/result.ts";
import type { RepositoryError } from "../../repository/RepositoryError.ts";
import type { User } from "../user/model.ts";
import type { EventNotFound } from "./read.ts";
import type { EventRepo } from "./repo.ts";
import type { Event } from "./model.ts";
import { ok } from "../../lang/result.ts";
import { eventReadByUserAndId } from "./read.ts";

export type EventUpdateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly category: Event["category"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export function eventUpdateToEvent(event: EventUpdateModel, existingEvent: Event): Event {
    return {
        id: existingEvent.id,
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: event.category,
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
        user: existingEvent.user,
        createdAt: existingEvent.createdAt,
        updatedAt: new Date(),
    };
}

type EventUpdateErrors =
    | RepositoryError
    | EventNotFound;

export async function eventUpdate(
    repo: EventRepo,
    userId: User["id"],
    eventId: Event["id"],
    event: EventUpdateModel,
): Promise<Result<Event, EventUpdateErrors>> {
    const existingEventResult = await eventReadByUserAndId(repo, userId, eventId);
    if (existingEventResult.type === "err") {
        return existingEventResult;
    }
    const builtEvent = eventUpdateToEvent(event, existingEventResult.data);
    const updateResult = await repo.cUpdate(builtEvent);
    if (updateResult.type === "err") {
        return updateResult;
    }
    return ok(builtEvent);
}

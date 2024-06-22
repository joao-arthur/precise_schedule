import type { Result } from "../../lang/result.ts";
import type { DateGenerator } from "../../generator.ts";
import type { RepoErr } from "../../repo.ts";
import type { User } from "../user/model.ts";
import type { EventNotFound } from "./read.ts";
import type { EventRepo } from "./repo.ts";
import type { Event } from "./model.ts";
import { ok } from "../../lang/result.ts";
import { eventReadOne } from "./read.ts";

export type EventUpdate = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly category: Event["category"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export function eventUpdateToEvent(event: EventUpdate, existingEvent: Event, now: Date): Event {
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
        updatedAt: now,
    };
}

type EventUpdateErrors =
    | RepoErr
    | EventNotFound;

export async function eventUpdate(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    eventId: Event["id"],
    event: EventUpdate,
): Promise<Result<Event, EventUpdateErrors>> {
    const existingEventResult = await eventReadOne(repo, userId, eventId);
    if (existingEventResult.type === "err") {
        return existingEventResult;
    }
    const now = dateGenerator.gen();
    const builtEvent = eventUpdateToEvent(event, existingEventResult.data, now);
    const updateResult = await repo.cUpdate(builtEvent);
    if (updateResult.type === "err") {
        return updateResult;
    }
    return ok(builtEvent);
}

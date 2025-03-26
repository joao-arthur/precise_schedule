import type { Result } from "../../../lang/result.ts";
import type { DateGenerator } from "../../../generator.ts";
import type { RepoErr } from "../../../repo.ts";
import type { ValidationErr } from "../../../validation/validate.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventNotFound } from "../read.ts";
import type { EventRepo } from "../repo.ts";
import type { EventUpdate } from "../update.ts";
import type { Event } from "../model.ts";
import { validateSchema } from "../../../validation/validate.ts";
import { eventUpdate } from "../update.ts";

export type DateUpdate = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

const dateUpdateSchema: Schema<DateUpdate> = {
    name: [
        { type: "str" },
        { type: "strMinLen", min: 1 },
        { type: "strMaxLen", max: 32 },
    ],
    day: [
        { type: "dt" },
        { type: "dtMin", min: "1970-01-01" },
    ],
    begin: [
        { type: "time" },
    ],
    end: [
        { type: "time" },
        { type: "gt", field: "begin" },
    ],
};

export function dateUpdateToEventUpdate(event: DateUpdate): EventUpdate {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "DATE",
        frequency: undefined,
        weekendRepeat: false,
    };
}

type DateUpdateErrors =
    | RepoErr
    | ValidationErr
    | EventNotFound;

export function dateUpdateService(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    eventId: Event["id"],
    event: DateUpdate,
): Promise<Result<Event, DateUpdateErrors>> {
    const schemaValidation = validateSchema(dateUpdateSchema, event);
    if (schemaValidation.type === "err") {
        return Promise.resolve(schemaValidation);
    }
    const builtEvent = dateUpdateToEventUpdate(event);
    return eventUpdate(repo, dateGenerator, userId, eventId, builtEvent);
}

import type { Result } from "../../../lang/result.ts";
import type { DateGenerator } from "../../../generator/date.ts";
import type { RepoError } from "../../../repository/repo.ts";
import type { ValidationError } from "../../../validation/validate.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventNotFound } from "../read.ts";
import type { EventRepo } from "../repo.ts";
import type { EventUpdate } from "../update.ts";
import type { Event } from "../model.ts";
import { validateSchema } from "../../../validation/validate.ts";
import { eventUpdate } from "../update.ts";

export type BirthdayUpdate = {
    readonly name: Event["name"];
    readonly day: Event["day"];
};

const birthdayUpdateSchema: Schema<BirthdayUpdate> = {
    name: [
        { type: "str" },
        { type: "strMinLen", min: 1 },
        { type: "strMaxLen", max: 32 },
    ],
    day: [
        { type: "dt" },
        { type: "dtMin", min: "1970-01-01" },
    ],
};

export function birthdayUpdateToEventUpdate(event: BirthdayUpdate): EventUpdate {
    return {
        name: event.name,
        day: event.day,
        begin: "00:00",
        end: "23:59",
        category: "BIRTHDAY",
        frequency: "1Y",
        weekendRepeat: false,
    };
}

type BirthdayUpdateErrors =
    | RepoError
    | ValidationError
    | EventNotFound;

export function birthdayUpdate(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    eventId: Event["id"],
    event: BirthdayUpdate,
): Promise<Result<Event, BirthdayUpdateErrors>> {
    const schemaValidation = validateSchema(birthdayUpdateSchema, event);
    if (schemaValidation.type === "err") {
        return Promise.resolve(schemaValidation);
    }
    const builtEvent = birthdayUpdateToEventUpdate(event);
    return eventUpdate(repo, dateGenerator, userId, eventId, builtEvent);
}

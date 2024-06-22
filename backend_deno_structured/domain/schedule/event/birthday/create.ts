import type { Result } from "../../../lang/result.ts";
import type { IdGenerator } from "../../../generator.ts";
import type { DateGenerator } from "../../../generator.ts";
import type { RepoErr } from "../../../repo.ts";
import type { ValidationErr } from "../../../validation/validate.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventRepo } from "../repo.ts";
import type { EventCreate } from "../create.ts";
import type { Event } from "../model.ts";
import { validateSchema } from "../../../validation/validate.ts";
import { eventCreate } from "../create.ts";

export type BirthdayCreate = {
    readonly name: Event["name"];
    readonly day: Event["day"];
};

const birthdayCreateSchema: Schema<BirthdayCreate> = {
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

export function birthdayCreateToEventCreate(event: BirthdayCreate): EventCreate {
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

type BirthdayCreateErrors =
    | RepoErr
    | ValidationErr;

export function birthdayCreateService(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    event: BirthdayCreate,
): Promise<Result<Event, BirthdayCreateErrors>> {
    const schemaValidation = validateSchema(birthdayCreateSchema, event);
    if (schemaValidation.type === "err") {
        return Promise.resolve(schemaValidation);
    }
    const builtEvent = birthdayCreateToEventCreate(event);
    return eventCreate(repo, idGenerator, dateGenerator, builtEvent, userId);
}

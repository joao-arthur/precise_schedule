import type { Result } from "../../../lang/result.ts";
import type { IdGenerator } from "../../../generator/id.ts";
import type { DateGenerator } from "../../../generator/date.ts";
import type { RepoError } from "../../../repo.ts";
import type { ValidationError } from "../../../validation/validate.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventRepo } from "../repo.ts";
import type { EventCreate } from "../create.ts";
import type { Event } from "../model.ts";
import { validateSchema } from "../../../validation/validate.ts";
import { eventCreate } from "../create.ts";

export type PartyCreate = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

const partyCreateSchema: Schema<PartyCreate> = {
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
        { type: "compareBigger", field: "begin" },
    ],
};

export function partyCreateToEventCreate(event: PartyCreate): EventCreate {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "PARTY",
        frequency: undefined,
        weekendRepeat: false,
    };
}

type PartyCreateErrors =
    | RepoError
    | ValidationError;

export function partyCreateService(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    event: PartyCreate,
): Promise<Result<Event, PartyCreateErrors>> {
    const schemaValidation = validateSchema(partyCreateSchema, event);
    if (schemaValidation.type === "err") {
        return Promise.resolve(schemaValidation);
    }
    const builtEvent = partyCreateToEventCreate(event);
    return eventCreate(repo, idGenerator, dateGenerator, builtEvent, userId);
}

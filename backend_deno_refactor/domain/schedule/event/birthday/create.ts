import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/validate.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventCreateModel } from "../create.ts";
import type { Event } from "../model.ts";
import { validateSchema } from "../../../validation/validate.ts";
import { eventCreate } from "../create.ts";

export type BirthdayCreateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
};

const birthdayCreateSchema: Schema<BirthdayCreateModel> = {
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

export function birthdayCreateToEventCreate(event: BirthdayCreateModel): EventCreateModel {
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
    | RepositoryError
    | ValidationError;

export function birthdayCreate(
    userId: User["id"],
    event: BirthdayCreateModel,
): Promise<Result<Event, BirthdayCreateErrors>> {
    const schemaValidation = validateSchema(birthdayCreateSchema, event);
    if (schemaValidation.type === "err") {
        return Promise.resolve(schemaValidation);
    }
    const builtEvent = birthdayCreateToEventCreate(event);
    return eventCreate(repo, idGenerator, builtEvent, userId);
}

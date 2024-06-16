import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventCreateModel } from "../create/model.ts";
import type { Event } from "../model.ts";
import { eventCreate } from "../create/service.ts";

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
    validator: ValidatorService,
    userId: User["id"],
    event: BirthdayCreateModel,
): Promise<Result<Event, BirthdayCreateErrors>> {
    const validationResult = validator.validate(event, birthdayCreateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = birthdayCreateToEventCreate(event);
    return eventCreate(repo, idGenerator, userId, builtEvent);
}

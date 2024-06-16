import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventCreateModel } from "../create/model.ts";
import type { Event } from "../model.ts";
import { eventCreate } from "../create/service.ts";

export type DateCreateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

const dateCreateSchema: Schema<DateCreateModel> = {
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

export function dateCreateToEventCreate(event: DateCreateModel): EventCreateModel {
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

type DateCreateErrors =
    | RepositoryError
    | ValidationError;

export function dateCreate(
    validator: ValidatorService,
    userId: User["id"],
    event: DateCreateModel,
): Promise<Result<Event, DateCreateErrors>> {
    const validationResult = validator.validate(event, dateCreateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = dateCreateToEventCreate(event);
    return eventCreate(repo, idGenerator, userId, builtEvent);
}

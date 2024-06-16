import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventCreateModel } from "../create/model.ts";
import type { Event } from "../model.ts";
import { eventCreate } from "../create/service.ts";

export type PartyCreateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

const partyCreateSchema: Schema<PartyCreateModel> = {
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

export function partyCreateToEventCreate(event: PartyCreateModel): EventCreateModel {
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
    | RepositoryError
    | ValidationError;

export function partyCreate(
    validator: ValidatorService,
    userId: User["id"],
    event: PartyCreateModel,
): Promise<Result<Event, PartyCreateErrors>> {
    const validationResult = validator.validate(event, partyCreateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = partyCreateToEventCreate(event);
    return eventCreate(repo, idGenerator, userId, builtEvent);
}

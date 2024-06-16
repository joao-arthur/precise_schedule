import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventNotFound } from "../find/error.eventNotFound.ts";
import type { EventUpdateModel } from "../update/model.ts";
import type { Event } from "../model.ts";
import { eventUpdate } from "../update/service.ts";

export type PartyUpdateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
};

export const partyUpdateSchema: Schema<PartyUpdateModel> = {
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

export function partyUpdateToEventUpdate(event: PartyUpdateModel): EventUpdateModel {
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

type PartyUpdateErrors =
    | RepositoryError
    | ValidationError
    | EventNotFound;

export function partyUpdate(
    validator: ValidatorService,
    userId: User["id"],
    eventId: Event["id"],
    event: PartyUpdateModel,
): Promise<Result<Event, PartyUpdateErrors>> {
    const validationResult = validator.validate(event, partyUpdateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = partyUpdateToEventUpdate(event);
    return eventUpdate(repo, userId, eventId, builtEvent);
}

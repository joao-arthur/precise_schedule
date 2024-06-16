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

export type BirthdayUpdateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
};

const birthdayUpdateSchema: Schema<BirthdayUpdateModel> = {
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

export function birthdayUpdateToEventUpdate(event: BirthdayUpdateModel): EventUpdateModel {
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
    | RepositoryError
    | ValidationError
    | EventNotFound;

export function birthdayUpdate(
    validator: ValidatorService,
    userId: User["id"],
    eventId: Event["id"],
    event: BirthdayUpdateModel,
): Promise<Result<Event, BirthdayUpdateErrors>> {
    const validationResult = validator.validate(event, birthdayUpdateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = birthdayUpdateToEventUpdate(event);
    return eventUpdate(repo, userId, eventId, builtEvent);
}

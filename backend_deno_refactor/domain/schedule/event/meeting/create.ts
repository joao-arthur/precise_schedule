import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventCreateModel } from "../create/model.ts";
import type { Event } from "../model.ts";
import { eventCreate } from "../create/service.ts";

export type MeetingCreateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

const meetingCreateSchema: Schema<MeetingCreateModel> = {
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
    frequency: [
        { type: "enum", values: ["1D", "2D", "1W", "1M", "3M", "6M", "1Y", "2Y", undefined] },
    ],
    weekendRepeat: [
        { type: "bool" },
    ],
};

export function meetingCreateToEventCreate(event: MeetingCreateModel): EventCreateModel {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "MEETING",
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

type MeetingCreateErrors =
    | RepositoryError
    | ValidationError;

export function meetingCreate(
    validator: ValidatorService,
    userId: User["id"],
    event: MeetingCreateModel,
): Promise<Result<Event, MeetingCreateErrors>> {
    const validationResult = validator.validate(event, meetingCreateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = meetingCreateToEventCreate(event);
    return eventCreate(repo, idGenerator, userId, builtEvent);
}
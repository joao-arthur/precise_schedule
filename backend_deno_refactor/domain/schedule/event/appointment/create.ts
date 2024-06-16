import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventCreateModel } from "../create/model.ts";
import type { Event } from "../model.ts";
import { eventCreate } from "../create/service.ts";

export type AppointmentCreateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

const appointmentCreateSchema: Schema<AppointmentCreateModel> = {
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

export function appointmentCreateToEventCreate(event: AppointmentCreateModel): EventCreateModel {
    return {
        name: event.name,
        day: event.day,
        begin: event.begin,
        end: event.end,
        category: "APPOINTMENT",
        frequency: event.frequency,
        weekendRepeat: event.weekendRepeat,
    };
}

type AppointmentCreateErrors =
    | RepositoryError
    | ValidationError;

export function appointmentCreate(
    validator: ValidatorService,
    userId: User["id"],
    event: AppointmentCreateModel,
): Promise<Result<Event, AppointmentCreateErrors>> {
    const validationResult = validator.validate(event, appointmentCreateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = appointmentCreateToEventCreate(event);
    return eventCreate(repo, idGenerator, userId, builtEvent);
}

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

export type AppointmentUpdateModel = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

const appointmentUpdateSchema: Schema<AppointmentUpdateModel> = {
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

export function appointmentUpdateToEventUpdate(event: AppointmentUpdateModel): EventUpdateModel {
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

type AppointmentUpdateErrors =
    | RepositoryError
    | ValidationError
    | EventNotFound;

export function appointmentUpdate(
    validator: ValidatorService,
    userId: User["id"],
    eventId: Event["id"],
    event: AppointmentUpdateModel,
): Promise<Result<Event, AppointmentUpdateErrors>> {
    const validationResult = validator.validate(event, appointmentUpdateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = appointmentUpdateToEventUpdate(event);
    return eventUpdate(repo, userId, eventId, builtEvent);
}

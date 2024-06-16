import type { Result } from "../../../lang/result.ts";
import type { IdGenerator } from "../../../generator/id.ts";
import type { DateGenerator } from "../../../generator/date.ts";
import type { RepoError } from "../../../repository/repo.ts";
import type { ValidationError } from "../../../validation/validate.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventRepo } from "../repo.ts";
import type { EventCreate } from "../create.ts";
import type { Event } from "../model.ts";
import { validateSchema } from "../../../validation/validate.ts";
import { eventCreate } from "../create.ts";

export type AppointmentCreate = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

const appointmentCreateSchema: Schema<AppointmentCreate> = {
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

export function appointmentCreateToEventCreate(event: AppointmentCreate): EventCreate {
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
    | RepoError
    | ValidationError;

export function appointmentCreate(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    event: AppointmentCreate,
): Promise<Result<Event, AppointmentCreateErrors>> {
    const schemaValidation = validateSchema(appointmentCreateSchema, event);
    if (schemaValidation.type === "err") {
        return Promise.resolve(schemaValidation);
    }
    const builtEvent = appointmentCreateToEventCreate(event);
    return eventCreate(repo, idGenerator, dateGenerator, builtEvent, userId);
}

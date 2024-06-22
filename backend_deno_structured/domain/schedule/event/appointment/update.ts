import type { Result } from "../../../lang/result.ts";
import type { DateGenerator } from "../../../generator.ts";
import type { RepoErr } from "../../../repo.ts";
import type { ValidationErr } from "../../../validation/validate.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventNotFound } from "../read.ts";
import type { EventRepo } from "../repo.ts";
import type { EventUpdate } from "../update.ts";
import type { Event } from "../model.ts";
import { validateSchema } from "../../../validation/validate.ts";
import { eventUpdate } from "../update.ts";

export type AppointmentUpdate = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

const appointmentUpdateSchema: Schema<AppointmentUpdate> = {
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
        { type: "gt", field: "begin" },
    ],
    frequency: [
        { type: "enum", values: ["1D", "2D", "1W", "1M", "3M", "6M", "1Y", "2Y", undefined] },
    ],
    weekendRepeat: [
        { type: "bool" },
    ],
};

export function appointmentUpdateToEventUpdate(event: AppointmentUpdate): EventUpdate {
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
    | RepoErr
    | ValidationErr
    | EventNotFound;

export function appointmentUpdateService(
    repo: EventRepo,
    dateGenerator: DateGenerator,
    userId: User["id"],
    eventId: Event["id"],
    event: AppointmentUpdate,
): Promise<Result<Event, AppointmentUpdateErrors>> {
    const schemaValidation = validateSchema(appointmentUpdateSchema, event);
    if (schemaValidation.type === "err") {
        return Promise.resolve(schemaValidation);
    }
    const builtEvent = appointmentUpdateToEventUpdate(event);
    return eventUpdate(repo, dateGenerator, userId, eventId, builtEvent);
}

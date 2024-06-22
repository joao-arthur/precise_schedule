import type { Result } from "../../../lang/result.ts";
import type { IdGenerator } from "../../../generator/id.ts";
import type { DateGenerator } from "../../../generator/date.ts";
import type { RepoErr } from "../../../repo.ts";
import type { ValidationErr } from "../../../validation/validate.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventRepo } from "../repo.ts";
import type { EventCreate } from "../create.ts";
import type { Event } from "../model.ts";
import { validateSchema } from "../../../validation/validate.ts";
import { eventCreate } from "../create.ts";

export type MeetingCreate = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

const meetingCreateSchema: Schema<MeetingCreate> = {
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

export function meetingCreateToEventCreate(event: MeetingCreate): EventCreate {
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
    | RepoErr
    | ValidationErr;

export function meetingCreateService(
    repo: EventRepo,
    idGenerator: IdGenerator,
    dateGenerator: DateGenerator,
    userId: User["id"],
    event: MeetingCreate,
): Promise<Result<Event, MeetingCreateErrors>> {
    const schemaValidation = validateSchema(meetingCreateSchema, event);
    if (schemaValidation.type === "err") {
        return Promise.resolve(schemaValidation);
    }
    const builtEvent = meetingCreateToEventCreate(event);
    return eventCreate(repo, idGenerator, dateGenerator, builtEvent, userId);
}

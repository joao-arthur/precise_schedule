import type { Result } from "../../../lang/result.ts";
import type { RepoError } from "../../../repository/repo.ts";
import type { ValidationError } from "../../../validation/validate.ts";
import type { Schema } from "../../../validation/schema.ts";
import type { User } from "../../user/model.ts";
import type { EventNotFound } from "../find/error.eventNotFound.ts";
import type { EventUpdate } from "../update/model.ts";
import type { Event } from "../model.ts";
import { validateSchema } from "../../../validation/validate.ts";
import { eventUpdate } from "../update.ts";

export type MeetingUpdate = {
    readonly name: Event["name"];
    readonly day: Event["day"];
    readonly begin: Event["begin"];
    readonly end: Event["end"];
    readonly frequency: Event["frequency"];
    readonly weekendRepeat: Event["weekendRepeat"];
};

export const meetingUpdateSchema: Schema<MeetingUpdate> = {
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

export function meetingUpdateToEventUpdate(event: MeetingUpdate): EventUpdate {
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

type MeetingUpdateErrors =
    | RepoError
    | ValidationError
    | EventNotFound;

export function meetingUpdate(
    userId: User["id"],
    eventId: Event["id"],
    event: MeetingUpdate,
): Promise<Result<Event, MeetingUpdateErrors>> {
    const schemaValidation = validateSchema(meetingUpdateSchema, event);
    if (schemaValidation.type === "err") {
        return Promise.resolve(schemaValidation);
    }
    const builtEvent = meetingUpdateToEventUpdate(event);
    return eventUpdate(repo, userId, eventId, builtEvent);
}

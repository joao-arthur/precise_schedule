import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { EventNotFound } from "../../find/error.eventNotFound.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { MeetingUpdateModel } from "./model.ts";
import { eventUpdate } from "../../update/service.ts";
import { buildEventUpdate } from "./factory.ts";
import { meetingUpdateSchema } from "./schema.ts";

export type MeetingUpdateErrors =
    | RepositoryError
    | ValidationError
    | EventNotFound;

export function meetingUpdate(
    validator: ValidatorService,
    userId: User["id"],
    eventId: Event["id"],
    event: MeetingUpdateModel,
): Promise<Result<Event, MeetingUpdateErrors>> {
    const validationResult = validator.validate(event, meetingUpdateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = buildEventUpdate(event);
    return eventUpdate(repository, userId, eventId, builtEvent);
}

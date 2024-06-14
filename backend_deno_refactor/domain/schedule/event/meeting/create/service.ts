import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { eventCreate } from "../../create/service.ts";
import type { Event } from "../../model.ts";
import type { MeetingCreateModel } from "./model.ts";
import { buildEventCreate } from "./factory.ts";
import { meetingCreateSchema } from "./schema.ts";

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
    const builtEvent = buildEventCreate(event);
    return eventCreate(repository, idGenerator, userId, builtEvent);
}

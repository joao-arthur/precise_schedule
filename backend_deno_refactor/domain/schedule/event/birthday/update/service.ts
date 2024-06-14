import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { EventNotFound } from "../../find/error.eventNotFound.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { BirthdayUpdateModel } from "./model.ts";
import { eventUpdate } from "../../update/service.ts";
import { buildEventUpdate } from "./factory.ts";
import { birthdayUpdateSchema } from "./schema.ts";

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
    const builtEvent = buildEventUpdate(event);
    return eventUpdate(repository, userId, eventId, builtEvent);
}

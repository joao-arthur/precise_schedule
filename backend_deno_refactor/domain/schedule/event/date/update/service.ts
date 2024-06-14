import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { EventNotFound } from "../../find/error.eventNotFound.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { DateUpdateModel } from "./model.ts";
import { eventUpdate } from "../../update/service.ts";
import { buildEventUpdate } from "./factory.ts";
import { dateUpdateSchema } from "./schema.ts";

type DateUpdateErrors =
    | RepositoryError
    | ValidationError
    | EventNotFound;

export function dateUpdate(
    validator: ValidatorService,
    userId: User["id"],
    eventId: Event["id"],
    event: DateUpdateModel,
): Promise<Result<Event, DateUpdateErrors>> {
    const validationResult = validator.validate(event, dateUpdateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = buildEventUpdate(event);
    return eventUpdate(repository, userId, eventId, builtEvent);
}

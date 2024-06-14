import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { EventNotFound } from "../../find/error.eventNotFound.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { PartyUpdateModel } from "./model.ts";
import { eventUpdate } from "../../update/service.ts";
import { buildEventUpdate } from "./factory.ts";
import { partyUpdateSchema } from "./schema.ts";

type PartyUpdateErrors =
    | RepositoryError
    | ValidationError
    | EventNotFound;

export function partyUpdate(
    validator: ValidatorService,
    userId: User["id"],
    eventId: Event["id"],
    event: PartyUpdateModel,
): Promise<Result<Event, PartyUpdateErrors>> {
    const validationResult = validator.validate(event, partyUpdateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = buildEventUpdate(event);
    return eventUpdate(repository, userId, eventId, builtEvent);
}

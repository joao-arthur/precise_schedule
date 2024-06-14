import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { eventCreate } from "../../create/service.ts";
import type { Event } from "../../model.ts";
import type { PartyCreateModel } from "./model.ts";
import { buildEventCreate } from "./factory.ts";
import { partyCreateSchema } from "./schema.ts";

type PartyCreateErrors =
    | RepositoryError
    | ValidationError;

export function partyCreate(
    validator: ValidatorService,
    userId: User["id"],
    event: PartyCreateModel,
): Promise<Result<Event, PartyCreateErrors>> {
    const validationResult = validator.validate(event, partyCreateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = buildEventCreate(event);
    return eventCreate(repository, idGenerator, userId, builtEvent);
}

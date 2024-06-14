import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { eventCreate } from "../../create/service.ts";
import type { Event } from "../../model.ts";
import type { DateCreateModel } from "./model.ts";
import { buildEventCreate } from "./factory.ts";
import { dateCreateSchema } from "./schema.ts";

type DateCreateErrors =
    | RepositoryError
    | ValidationError;

export function dateCreate(
    validator: ValidatorService,
    userId: User["id"],
    event: DateCreateModel,
): Promise<Result<Event, DateCreateErrors>> {
    const validationResult = validator.validate(event, dateCreateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = buildEventCreate(event);
    return eventCreate(repository, idGenerator, userId, builtEvent);
}

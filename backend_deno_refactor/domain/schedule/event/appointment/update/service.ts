import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { EventNotFound } from "../../find/error.eventNotFound.ts";
import type { Event } from "../../model.ts";
import type { AppointmentUpdateModel } from "./model.ts";
import { eventUpdate } from "../../update/service.ts";
import { buildEventUpdate } from "./factory.ts";
import { appointmentUpdateSchema } from "./schema.ts";

type AppointmentUpdateErrors =
    | RepositoryError
    | ValidationError
    | EventNotFound;

export function appointmentUpdate(
    validator: ValidatorService,
    userId: User["id"],
    eventId: Event["id"],
    event: AppointmentUpdateModel,
): Promise<Result<Event, AppointmentUpdateErrors>> {
    const validationResult = validator.validate(event, appointmentUpdateSchema);
    if (validationResult.type === "err") {
        return Promise.resolve(validationResult);
    }
    const builtEvent = buildEventUpdate(event);
    return eventUpdate(repository, userId, eventId, builtEvent);
}

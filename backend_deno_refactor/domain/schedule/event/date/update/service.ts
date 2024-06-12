import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { User } from "../../../user/model.ts";
import type { EventNotFound } from "../../find/error.eventNotFound.ts";
import type { Event } from "../../model.ts";
import type { DateUpdateModel } from "./model.ts";

export type DateUpdateErrors =
    | RepositoryError
    | ValidationError
    | EventNotFound;

export type DateUpdateService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: DateUpdateModel,
    ) => Promise<Result<Event, DateUpdateErrors>>;
};

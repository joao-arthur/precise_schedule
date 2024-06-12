import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { DateCreateModel } from "./model.ts";

export type DateCreateErrors =
    | RepositoryError
    | ValidationError;

export type DateCreateService = {
    readonly create: (
        userId: User["id"],
        event: DateCreateModel,
    ) => Promise<Result<Event, DateCreateErrors>>;
};

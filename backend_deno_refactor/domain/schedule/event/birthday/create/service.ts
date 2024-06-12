import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { BirthdayCreateModel } from "./model.ts";

export type BirthdayCreateErrors =
    | RepositoryError
    | ValidationError;

export type BirthdayCreateService = {
    readonly create: (
        userId: User["id"],
        event: BirthdayCreateModel,
    ) => Promise<Result<Event, BirthdayCreateErrors>>;
};

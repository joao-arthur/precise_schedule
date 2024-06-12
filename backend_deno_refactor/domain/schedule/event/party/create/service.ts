import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { PartyCreateModel } from "./model.ts";

export type PartyCreateErrors =
    | RepositoryError
    | ValidationError;

export type PartyCreateService = {
    readonly create: (
        userId: User["id"],
        event: PartyCreateModel,
    ) => Promise<Result<Event, PartyCreateErrors>>;
};

import type { Result } from "../../../../lang/result.ts";
import type { RepositoryError } from "../../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../../validation/ValidationError.ts";
import type { User } from "../../../user/model.ts";
import type { EventNotFound } from "../../find/error.eventNotFound.ts";
import type { Event } from "../../model.ts";
import type { PartyUpdateModel } from "./model.ts";

export type PartyUpdateErrors =
    | RepositoryError
    | ValidationError
    | EventNotFound;

export type PartyUpdateService = {
    readonly update: (
        userId: User["id"],
        id: Event["id"],
        event: PartyUpdateModel,
    ) => Promise<Result<Event, PartyUpdateErrors>>;
};

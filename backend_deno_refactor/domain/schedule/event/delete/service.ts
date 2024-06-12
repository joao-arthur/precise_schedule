import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { EventNotFound } from "../find/error.eventNotFound.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";

export type EventDeleteErrors =
    | RepositoryError
    | EventNotFound;

export type EventDeleteService = {
    readonly del: (
        userId: User["id"],
        id: Event["id"],
    ) => Promise<Result<void, EventDeleteErrors>>;
};

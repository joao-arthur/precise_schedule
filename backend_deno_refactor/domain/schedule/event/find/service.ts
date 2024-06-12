import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";
import type { EventFindModel } from "./model.ts";
import type { EventNotFound } from "./error.eventNotFound.ts";

export type FindByUserErrors = RepositoryError;
export type FindByUserAndIdErrors = RepositoryError | EventNotFound;

export type EventFindService = {
    readonly findByUser: (
        userId: User["id"],
    ) => Promise<Result<readonly Event[], FindByUserErrors>>;
    readonly findByUserMapped: (
        userId: User["id"],
    ) => Promise<Result<readonly EventFindModel[], FindByUserErrors>>;
    readonly findByUserAndId: (
        userId: User["id"],
        id: Event["id"],
    ) => Promise<Result<Event, FindByUserAndIdErrors>>;
    readonly findByUserAndIdMapped: (
        userId: User["id"],
        id: Event["id"],
    ) => Promise<Result<EventFindModel, FindByUserAndIdErrors>>;
};

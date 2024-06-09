import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { User } from "../../user/model.ts";
import type { Event } from "../model.ts";

export type EventFindRepository = {
    readonly findByUser: (
        userId: User["id"],
    ) => Promise<Result<readonly Event[], RepositoryError>>;
    readonly findByUserAndId: (
        userId: User["id"],
        id: Event["id"],
    ) => Promise<Result<Event | undefined, RepositoryError>>;
};

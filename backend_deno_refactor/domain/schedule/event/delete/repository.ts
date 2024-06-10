import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { Event } from "../model.ts";

export type EventDeleteRepository = {
    readonly del: (
        id: Event["id"],
    ) => Promise<Result<void, RepositoryError>>;
};

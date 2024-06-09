import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { Event } from "../model.ts";

export type EventUpdateRepository = {
    readonly update: (event: Event) => Promise<Result<void, RepositoryError>>;
};

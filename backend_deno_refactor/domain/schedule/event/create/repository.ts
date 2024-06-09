import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { Event } from "../model.ts";

export type EventCreateRepository = {
    readonly create: (event: Event) => Promise<Result<void, RepositoryError>>;
};

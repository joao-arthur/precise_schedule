import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { User } from "../model.ts";

export type UserUpdateRepository = {
    readonly update: (
        user: User,
    ) => Promise<Result<void, RepositoryError>>;
};

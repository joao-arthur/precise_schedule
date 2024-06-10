import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { User } from "../model.ts";

export type UserCreateRepository = {
    readonly create: (
        user: User,
    ) => Promise<Result<void, RepositoryError>>;
};

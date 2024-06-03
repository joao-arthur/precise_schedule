import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { User } from "../model.ts";

export type UserFindRepository = {
    readonly findById: (
        id: User["id"],
    ) => Promise<Result<User | undefined, RepositoryError>>;
    readonly findByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => Promise<Result<User | undefined, RepositoryError>>;
};

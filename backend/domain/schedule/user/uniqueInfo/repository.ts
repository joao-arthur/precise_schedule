import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { User } from "../model.ts";

export type UserUniqueInfoRepository = {
    readonly countUsername: (
        username: User["username"],
    ) => Promise<Result<number, RepositoryError>>;
    readonly countEmail: (
        email: User["email"],
    ) => Promise<Result<number, RepositoryError>>;
};

import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserNotFound } from "./error.userNotFound.ts";

export type UserFindErrors =
    | RepositoryError
    | UserNotFound;

export type UserFindService = {
    readonly findById: (
        id: User["id"],
    ) => Promise<Result<User, UserFindErrors>>;
    readonly findByIdMapped: (
        id: User["id"],
    ) => Promise<Result<UserFindModel, UserFindErrors>>;
    readonly findByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => Promise<Result<User, UserFindErrors>>;
};

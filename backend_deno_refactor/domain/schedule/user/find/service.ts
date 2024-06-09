import type { Result } from "../../../lang/result.ts";
import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserNotFound } from "./error.userNotFound.ts";

export type UserFindService = {
    readonly findById: (
        id: User["id"],
    ) => Promise<Result<User, UserNotFound>>;
    readonly findByIdMapped: (
        id: User["id"],
    ) => Promise<Result<UserFindModel, UserNotFound>>;
    readonly findByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => Promise<Result<User, UserNotFound>>;
};

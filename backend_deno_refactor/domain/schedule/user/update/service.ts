import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { UserNotFound } from "../find/error.userNotFound.ts";
import type { UsernameAlreadyRegistered } from "../uniqueInfo/error.usernameAlreadyRegistered.ts";
import type { EmailAlreadyRegistered } from "../uniqueInfo/error.emailAlreadyRegistered.ts";
import type { User } from "../model.ts";
import type { UserUpdateModel } from "./model.ts";

export type UserUpdateErrors =
    | RepositoryError
    | ValidationError
    | UserNotFound
    | UsernameAlreadyRegistered
    | EmailAlreadyRegistered;

export type UserUpdateService = {
    readonly update: (
        id: User["id"],
        user: UserUpdateModel,
    ) => Promise<Result<User, UserUpdateErrors>>;
};

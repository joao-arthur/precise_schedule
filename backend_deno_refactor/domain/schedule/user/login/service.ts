import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { Session } from "../../../session/model.ts";
import type { UserNotFound } from "../find/error.userNotFound.ts";
import type { UserLoginModel } from "./model.ts";

export type UserLoginErrors =
    | RepositoryError
    | ValidationError
    | UserNotFound;

export type UserLoginService = {
    readonly userLogin: (user: UserLoginModel) => Promise<Result<Session, UserLoginErrors>>;
};

import type { Result } from "../../../lang/result.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { Session } from "../../../session/model.ts";
import type { UsernameAlreadyRegistered } from "../uniqueInfo/error.usernameAlreadyRegistered.ts";
import type { EmailAlreadyRegistered } from "../uniqueInfo/error.emailAlreadyRegistered.ts";
import type { UserCreateModel } from "./model.ts";

export type UserCreateErrors =
    | ValidationError
    | UsernameAlreadyRegistered
    | EmailAlreadyRegistered;

export type UserCreateService = {
    readonly create: (user: UserCreateModel) => Promise<Result<Session, UserCreateErrors>>;
};

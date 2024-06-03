import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { User } from "../model.ts";
import type { UsernameAlreadyRegistered } from "./error.usernameAlreadyRegistered.ts";
import type { EmailAlreadyRegistered } from "./error.emailAlreadyRegistered.ts";
import type { UserUniqueInfoModel } from "./model.ts";

export type UserUniqueInfoErrors =
    | RepositoryError
    | UsernameAlreadyRegistered
    | EmailAlreadyRegistered;

export type UserUniqueInfoService = {
    readonly validateNew: (
        user: UserUniqueInfoModel,
    ) => Promise<Result<void, UserUniqueInfoErrors>>;
    readonly validateExisting: (
        user: UserUniqueInfoModel,
        oldUser: User,
    ) => Promise<Result<void, UserUniqueInfoErrors>>;
};

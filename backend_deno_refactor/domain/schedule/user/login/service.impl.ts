import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { UserNotFound } from "../find/error.userNotFound.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { Session } from "../../../session/model.ts";
import type { SessionCreateService } from "../../../session/create/service.ts";
import type { UserLoginModel } from "./model.ts";
import { userLoginSchema } from "./schema.ts";

export type UserLoginErrors =
    | RepositoryError
    | ValidationError
    | UserNotFound;

export async function userLogin(
    validator: ValidatorService,
    sessionCreateService: SessionCreateService,
    user: UserLoginModel,
): Promise<Result<Session, UserLoginErrors>> {
    const validationResult = validator.validate(user, userLoginSchema);
    if (validationResult.type === "err") {
        return validationResult;
    }
    const existingUserResult = await userFindService.findByCredentials(
        user.username,
        user.password,
    );
    if (existingUserResult.type === "err") {
        return existingUserResult;
    }
    return sessionCreateService.create(existingUserResult.data.id);
}

import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/ValidationError.ts";
import type { UserNotFound } from "../find/error.userNotFound.ts";
import type { UsernameAlreadyRegistered } from "../uniqueInfo/error.usernameAlreadyRegistered.ts";
import type { EmailAlreadyRegistered } from "../uniqueInfo/error.emailAlreadyRegistered.ts";
import type { ValidatorService } from "../../../validation/validator/service.ts";
import type { User } from "../model.ts";
import type { UserUpdateModel } from "./model.ts";
import type { UserUpdateRepository } from "./repo.ts";
import { ok } from "../../../lang/result.ts";
import { userUniqueInfoValidateExisting } from "../uniqueInfo/service.ts";
import { buildUser } from "./factory.ts";
import { userUpdateSchema } from "./schema.ts";

type UserUpdateErrors =
    | RepositoryError
    | ValidationError
    | UserNotFound
    | UsernameAlreadyRegistered
    | EmailAlreadyRegistered;

export async function userUpdate(
    repo: UserUpdateRepository,
    validator: ValidatorService,
    id: User["id"],
    user: UserUpdateModel,
): Promise<Result<User, UserUpdateErrors>> {
    const validationResult = validator.validate(user, userUpdateSchema);
    if (validationResult.type === "err") {
        return validationResult;
    }
    const existingUser = await userFindService.findById(id);
    if (existingUser.type === "err") {
        return existingUser;
    }
    const existingResult = await userUniqueInfoValidateExisting(
        repo,
        user,
        existingUser.data,
    );
    if (existingResult.type === "err") {
        return existingResult;
    }
    const builtUser = buildUser(user, existingUser.data);
    const updateResult = await repo.update(builtUser);
    if (updateResult.type === "err") {
        return updateResult;
    }
    return ok(builtUser);
}

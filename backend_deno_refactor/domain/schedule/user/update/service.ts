import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { ValidationError } from "../../../validation/validate.ts";
import type { UserNotFound } from "../find/error.userNotFound.ts";
import type { UsernameAlreadyRegistered } from "../uniqueInfo/error.usernameAlreadyRegistered.ts";
import type { EmailAlreadyRegistered } from "../uniqueInfo/error.emailAlreadyRegistered.ts";
import type { User } from "../model.ts";
import type { UserUpdateModel } from "./model.ts";
import type { UserRepo } from "./repo.ts";
import { ok } from "../../../lang/result.ts";
import { validateSchema } from "../../../validation/validate.ts";
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
    repo: UserRepo,
    id: User["id"],
    user: UserUpdateModel,
): Promise<Result<User, UserUpdateErrors>> {
    const schemaValidation = validateSchema(userUpdateSchema, user);
    if (schemaValidation.type === "err") {
        return schemaValidation;
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

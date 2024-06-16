import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { UserRepo } from "./repo.ts";
import type { User } from "../model.ts";
import type { UserUniqueInfoModel } from "./model.ts";
import { err, ok } from "../../../lang/result.ts";
import { EmailAlreadyRegistered } from "./error.emailAlreadyRegistered.ts";
import { UsernameAlreadyRegistered } from "./error.usernameAlreadyRegistered.ts";

type UserUniqueInfoErrors =
    | RepositoryError
    | UsernameAlreadyRegistered
    | EmailAlreadyRegistered;

export async function userUniqueInfoValidateNew(
    repo: UserRepo,
    user: UserUniqueInfoModel,
): Promise<Result<void, UserUniqueInfoErrors>> {
    const countUsername = await repo.countUsername(user.username);
    if (countUsername.type === "err") {
        return countUsername;
    }
    if (countUsername.data > 0) {
        return err(new UsernameAlreadyRegistered());
    }
    const countEmail = await repo.countEmail(user.email);
    if (countEmail.type === "err") {
        return countEmail;
    }
    if (countEmail.data > 0) {
        return err(new EmailAlreadyRegistered());
    }
    return ok(undefined);
}

export async function userUniqueInfoValidateExisting(
    repo: UserRepo,
    user: UserUniqueInfoModel,
    oldUser: User,
): Promise<Result<void, UserUniqueInfoErrors>> {
    const countUsername = await repo.countUsername(user.username);
    if (countUsername.type === "err") {
        return countUsername;
    }
    if (countUsername.data > 0 && user.username !== oldUser.username) {
        return err(new UsernameAlreadyRegistered());
    }
    const countEmail = await repo.countEmail(user.email);
    if (countEmail.type === "err") {
        return countEmail;
    }
    if (countEmail.data > 0 && user.email !== oldUser.email) {
        return err(new EmailAlreadyRegistered());
    }
    return ok(undefined);
}

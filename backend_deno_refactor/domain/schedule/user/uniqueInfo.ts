import type { Result } from "../../lang/result.ts";
import type { RepoError } from "../../repo.ts";
import type { UserRepo } from "./repo.ts";
import type { User } from "./model.ts";
import { err, ok } from "../../lang/result.ts";
import { BusinessError } from "../../general.ts";

export class UsernameAlreadyRegistered extends BusinessError {
    constructor() {
        super("This username is already taken, please choose another one!");
    }
}

export class EmailAlreadyRegistered extends BusinessError {
    constructor() {
        super("This e-mail is already registered, please use another one!");
    }
}

export type UserUniqueInfo = {
    readonly username: User["username"];
    readonly email: User["email"];
};

type UserUniqueInfoErrors =
    | RepoError
    | UsernameAlreadyRegistered
    | EmailAlreadyRegistered;

export async function userNewValidateUnique(
    repo: UserRepo,
    user: UserUniqueInfo,
): Promise<Result<void, UserUniqueInfoErrors>> {
    const countUsername = await repo.cCountUsername(user.username);
    if (countUsername.type === "err") {
        return countUsername;
    }
    if (countUsername.data > 0) {
        return err(new UsernameAlreadyRegistered());
    }
    const countEmail = await repo.cCountEmail(user.email);
    if (countEmail.type === "err") {
        return countEmail;
    }
    if (countEmail.data > 0) {
        return err(new EmailAlreadyRegistered());
    }
    return ok(undefined);
}

export async function userExistingValidateUnique(
    repo: UserRepo,
    user: UserUniqueInfo,
    oldUser: User,
): Promise<Result<void, UserUniqueInfoErrors>> {
    if (user.username !== oldUser.username) {
        const countUsername = await repo.cCountUsername(user.username);
        if (countUsername.type === "err") {
            return countUsername;
        }
        if (countUsername.data > 0) {
            return err(new UsernameAlreadyRegistered());
        }
    }
    if (user.email !== oldUser.email) {
        const countEmail = await repo.cCountEmail(user.email);
        if (countEmail.type === "err") {
            return countEmail;
        }
        if (countEmail.data > 0) {
            return err(new EmailAlreadyRegistered());
        }
    }
    return ok(undefined);
}

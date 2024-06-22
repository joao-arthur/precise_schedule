import type { Result } from "../../lang/result.ts";
import type { RepoErr } from "../../repo.ts";
import type { UserRepo } from "./repo.ts";
import type { User } from "./model.ts";
import { err, ok } from "../../lang/result.ts";
import { BusinessErr } from "../../general.ts";

export class UserNotFound extends BusinessErr {
    constructor() {
        super("The user was not found!");
    }
}

export type UserInfo = {
    readonly firstName: User["firstName"];
    readonly birthdate: User["birthdate"];
    readonly email: User["email"];
    readonly username: User["username"];
};

export function userInfoBuild(user: User): UserInfo {
    return {
        firstName: user.firstName,
        birthdate: user.birthdate,
        email: user.email,
        username: user.username,
    };
}

type UserReadErrors =
    | RepoErr
    | UserNotFound;

export async function userReadById(
    repo: UserRepo,
    id: User["id"],
): Promise<Result<User, UserReadErrors>> {
    const foundUserResult = await repo.cReadById(id);
    if (foundUserResult.type === "err") {
        return foundUserResult;
    }
    if (foundUserResult.data === undefined) {
        return err(new UserNotFound());
    }
    return ok(foundUserResult.data);
}

export async function userReadByCredentials(
    repo: UserRepo,
    username: User["username"],
    password: User["password"],
): Promise<Result<User, UserReadErrors>> {
    const foundUserResult = await repo.cReadByCredentials(username, password);
    if (foundUserResult.type === "err") {
        return foundUserResult;
    }
    if (foundUserResult.data === undefined) {
        return err(new UserNotFound());
    }
    return ok(foundUserResult.data);
}

export async function userInfoReadByIdService(
    repo: UserRepo,
    id: User["id"],
): Promise<Result<UserInfo, UserReadErrors>> {
    const foundUserResult = await userReadById(repo, id);
    if (foundUserResult.type === "err") {
        return foundUserResult;
    }
    const builtUser = userInfoBuild(foundUserResult.data);
    return ok(builtUser);
}

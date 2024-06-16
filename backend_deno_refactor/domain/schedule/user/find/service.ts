import type { Result } from "../../../lang/result.ts";
import type { RepoError } from "../../../repository/repo.ts";
import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserRepo } from "./repo.ts";
import { err, ok } from "../../../lang/result.ts";
import { buildUserFind } from "./factory.ts";
import { UserNotFound } from "./error.userNotFound.ts";

export type UserFindErrors =
    | RepoError
    | UserNotFound;

export async function userFindById(
    repo: UserRepo,
    id: User["id"],
): Promise<Result<User, UserFindErrors>> {
    const foundUserResult = await repo.findById(id);
    if (foundUserResult.type === "err") {
        return foundUserResult;
    }
    if (foundUserResult.data === undefined) {
        return err(new UserNotFound());
    }
    return ok(foundUserResult.data);
}

export async function userFindByIdMapped(
    repo: UserRepo,
    id: User["id"],
): Promise<Result<UserFindModel, UserFindErrors>> {
    const foundUserResult = await repo.findById(id);
    if (foundUserResult.type === "err") {
        return foundUserResult;
    }
    if (foundUserResult.data === undefined) {
        return err(new UserNotFound());
    }
    const builtUser = buildUserFind(foundUserResult.data);
    return ok(builtUser);
}

export async function userFindByCredentials(
    repo: UserRepo,
    username: User["username"],
    password: User["password"],
): Promise<Result<User, UserFindErrors>> {
    const foundUserResult = await repo.findByCredentials(username, password);
    if (foundUserResult.type === "err") {
        return foundUserResult;
    }
    if (foundUserResult.data === undefined) {
        return err(new UserNotFound());
    }
    return ok(foundUserResult.data);
}

import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserFindRepository } from "./repository.ts";
import { err, ok } from "../../../lang/result.ts";
import { buildUserFind } from "./factory.ts";
import { UserNotFound } from "./error.userNotFound.ts";

export type UserFindErrors =
    | RepositoryError
    | UserNotFound;

export async function userFindById(
    repository: UserFindRepository,
    id: User["id"],
): Promise<Result<User, UserFindErrors>> {
    const foundUserResult = await repository.findById(id);
    if (foundUserResult.type === "err") {
        return foundUserResult;
    }
    if (foundUserResult.data === undefined) {
        return err(new UserNotFound());
    }
    return ok(foundUserResult.data);
}

export async function userFindByIdMapped(
    repository: UserFindRepository,
    id: User["id"],
): Promise<Result<UserFindModel, UserFindErrors>> {
    const foundUserResult = await repository.findById(id);
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
    repository: UserFindRepository,
    username: User["username"],
    password: User["password"],
): Promise<Result<User, UserFindErrors>> {
    const foundUserResult = await repository.findByCredentials(username, password);
    if (foundUserResult.type === "err") {
        return foundUserResult;
    }
    if (foundUserResult.data === undefined) {
        return err(new UserNotFound());
    }
    return ok(foundUserResult.data);
}

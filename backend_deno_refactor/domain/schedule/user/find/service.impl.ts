import type { Result } from "../../../lang/result.ts";
import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserFindRepository } from "./repository.ts";
import type { UserFindErrors, UserFindService } from "./service.ts";
import { err, ok } from "../../../lang/result.ts";
import { buildUserFind } from "./factory.ts";
import { UserNotFound } from "./error.userNotFound.ts";

export class UserFindServiceImpl implements UserFindService {
    constructor(
        private readonly repository: UserFindRepository,
    ) {}

    public async findById(id: User["id"]): Promise<Result<User, UserFindErrors>> {
        const foundUserResult = await this.repository.findById(id);
        if (foundUserResult.type === "err") {
            return foundUserResult;
        }
        if (foundUserResult.data === undefined) {
            return err(new UserNotFound());
        }
        return ok(foundUserResult.data);
    }

    public async findByIdMapped(id: User["id"]): Promise<Result<UserFindModel, UserFindErrors>> {
        const foundUserResult = await this.repository.findById(id);
        if (foundUserResult.type === "err") {
            return foundUserResult;
        }
        if (foundUserResult.data === undefined) {
            return err(new UserNotFound());
        }
        const builtUser = buildUserFind(foundUserResult.data);
        return ok(builtUser);
    }

    public async findByCredentials(
        username: User["username"],
        password: User["password"],
    ): Promise<Result<User, UserFindErrors>> {
        const foundUserResult = await this.repository.findByCredentials(username, password);
        if (foundUserResult.type === "err") {
            return foundUserResult;
        }
        if (foundUserResult.data === undefined) {
            return err(new UserNotFound());
        }
        return ok(foundUserResult.data);
    }
}

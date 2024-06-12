import type { Result } from "../../../lang/result.ts";
import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserFindFactory } from "./factory.ts";
import type { UserFindRepository } from "./repository.ts";
import type { UserFindErrors, UserFindService } from "./service.ts";
import { buildErr, buildOk } from "../../../lang/result.ts";
import { UserNotFound } from "./error.userNotFound.ts";

export class UserFindServiceImpl implements UserFindService {
    constructor(
        private readonly factory: UserFindFactory,
        private readonly repository: UserFindRepository,
    ) {}

    public async findById(id: User["id"]): Promise<Result<User, UserFindErrors>> {
        const foundUserResult = await this.repository.findById(id);
        if (foundUserResult.type === "err") {
            return foundUserResult;
        }
        if (foundUserResult.data === undefined) {
            return buildErr(new UserNotFound());
        }
        return buildOk(foundUserResult.data);
    }

    public async findByIdMapped(id: User["id"]): Promise<Result<UserFindModel, UserFindErrors>> {
        const foundUserResult = await this.repository.findById(id);
        if (foundUserResult.type === "err") {
            return foundUserResult;
        }
        if (foundUserResult.data === undefined) {
            return buildErr(new UserNotFound());
        }
        return buildOk(this.factory.build(foundUserResult.data));
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
            return buildErr(new UserNotFound());
        }
        return buildOk(foundUserResult.data);
    }
}

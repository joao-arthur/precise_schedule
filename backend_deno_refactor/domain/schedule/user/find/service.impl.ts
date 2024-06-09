import type { Result } from "../../../lang/result.ts";
import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserFindService } from "./service.ts";
import type { UserFindFactory } from "./factory.ts";
import type { UserFindRepository } from "./repository.ts";
import { buildErr, buildOk } from "../../../lang/result.ts";
import { UserNotFound } from "./error.userNotFound.ts";

export class UserFindServiceImpl implements UserFindService {
    constructor(
        private readonly factory: UserFindFactory,
        private readonly repository: UserFindRepository,
    ) {}

    public async findById(id: User["id"]): Promise<Result<User, UserNotFound>> {
        const maybeUser = await this.repository.findById(id);
        if (maybeUser === undefined) {
            return buildErr(new UserNotFound());
        }
        return buildOk(maybeUser);
    }

    public async findByIdMapped(id: User["id"]): Promise<Result<UserFindModel, UserNotFound>> {
        const maybeUser = await this.repository.findById(id);
        if (maybeUser === undefined) {
            return buildErr(new UserNotFound());
        }
        return buildOk(this.factory.build(maybeUser));
    }

    public async findByCredentials(
        username: User["username"],
        password: User["password"],
    ): Promise<Result<User, UserNotFound>> {
        const maybeUser = await this.repository.findByCredentials(username, password);
        if (maybeUser === undefined) {
            return buildErr(new UserNotFound());
        }
        return buildOk(maybeUser);
    }
}

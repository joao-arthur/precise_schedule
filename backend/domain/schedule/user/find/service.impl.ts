import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";
import type { UserFindService } from "./service.ts";
import type { UserFindFactory } from "./factory.ts";
import type { UserFindRepository } from "./repository.ts";

import { UserNotFound } from "./UserNotFound.ts";

export class UserFindServiceImpl implements UserFindService {
    constructor(
        private readonly factory: UserFindFactory,
        private readonly repository: UserFindRepository,
    ) {}

    public async findById(id: User["id"]): Promise<User> {
        const maybeUser = await this.repository.findById(id);
        if (!maybeUser) {
            throw new UserNotFound();
        }
        return maybeUser;
    }

    public async findByIdMapped(id: User["id"]): Promise<UserFindModel> {
        return this.factory.build(await this.findById(id));
    }

    public async findByCredentials(
        username: User["username"],
        password: User["password"],
    ): Promise<User> {
        const maybeUser = await this.repository.findByCredentials(
            username,
            password,
        );
        if (!maybeUser) {
            throw new UserNotFound();
        }
        return maybeUser;
    }
}

import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";
import type { FindUserRepository } from "@ps/domain/schedule/user/find/FindUserRepository.ts";

import { UserNotFound } from "@ps/domain/schedule/user/find/UserNotFound.ts";

export class FindUserServiceImpl implements FindUserService {
    constructor(private readonly repository: FindUserRepository) {}

    public async findById(id: User["id"]): Promise<User> {
        const maybeUser = await this.repository.findById(id);
        if (!maybeUser) {
            throw new UserNotFound();
        }
        return maybeUser;
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

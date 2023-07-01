import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";
import type { FindUserRepository } from "@ps/domain/schedule/user/find/FindUserRepository.ts";

import { UserNotFound } from "@ps/domain/schedule/user/find/UserNotFound.ts";

export class FindUserServiceImpl implements FindUserService {
    constructor(private readonly repository: FindUserRepository) {}

    public findById(id: User["id"]): User {
        const maybeUser = this.repository.findById(id);
        if (!maybeUser) {
            throw new UserNotFound();
        }
        return maybeUser;
    }

    public findByCredentials(
        username: User["username"],
        password: User["password"],
    ): User {
        const maybeUser = this.repository.findByCredentials(
            username,
            password,
        );
        if (!maybeUser) {
            throw new UserNotFound();
        }
        return maybeUser;
    }
}

import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserRepository } from "@ps/domain/schedule/user/find/FindUserRepository.ts";

export class FindUserRepositoryMock implements FindUserRepository {
    constructor(private readonly user: User | undefined) {}

    public findById(): User | undefined {
        return this.user;
    }

    public findByCredentials(): User | undefined {
        return this.user;
    }
}

import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserRepository } from "@ps/domain/schedule/user/find/FindUserRepository.ts";

export class FindUserRepositoryMock implements FindUserRepository {
    constructor(private readonly user: User | undefined) {}

    public findById(): Promise<User | undefined> {
        return Promise.resolve(this.user);
    }

    public findByCredentials(): Promise<User | undefined> {
        return Promise.resolve(this.user);
    }
}

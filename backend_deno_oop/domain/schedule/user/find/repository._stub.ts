import type { User } from "../model.ts";
import type { UserFindRepository } from "./repository.ts";

export class UserFindRepositoryStub implements UserFindRepository {
    constructor(private readonly user: User | undefined) {}

    public findById(): Promise<User | undefined> {
        return Promise.resolve(this.user);
    }

    public findByCredentials(): Promise<User | undefined> {
        return Promise.resolve(this.user);
    }
}

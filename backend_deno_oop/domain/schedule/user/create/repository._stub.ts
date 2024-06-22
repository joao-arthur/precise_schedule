import type { UserCreateRepository } from "./repository.ts";

export class UserCreateRepositoryStub implements UserCreateRepository {
    public async create(): Promise<void> {}
}

import type { UserUpdateRepository } from "./repository.ts";

export class UserUpdateRepositoryStub implements UserUpdateRepository {
    public async update(): Promise<void> {}
}

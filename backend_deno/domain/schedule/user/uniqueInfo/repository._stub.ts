import type { UserUniqueInfoRepository } from "./repository.ts";

export class UserUniqueInfoRepositoryStub implements UserUniqueInfoRepository {
    constructor(
        private readonly numUsername: number,
        private readonly numEmail: number,
    ) {}

    public countUsername(): Promise<number> {
        return Promise.resolve(this.numUsername);
    }

    public countEmail(): Promise<number> {
        return Promise.resolve(this.numEmail);
    }
}

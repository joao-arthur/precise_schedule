import type { UniqueInfoRepository } from "@ps/domain/schedule/user/uniqueInfo/UniqueInfoRepository.ts";

export class UniqueInfoRepositoryMock
    implements UniqueInfoRepository {
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

import type { UniqueInfoRepository } from "@ps/domain/schedule/user/uniqueInfo/UniqueInfoRepository.ts";

export class UniqueInfoRepositoryMock
    implements UniqueInfoRepository {
    constructor(
        private readonly numUsername: number,
        private readonly numEmail: number,
    ) {}

    public countUsername(): number {
        return this.numUsername;
    }

    public countEmail(): number {
        return this.numEmail;
    }
}

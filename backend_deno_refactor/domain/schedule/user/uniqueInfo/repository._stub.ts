import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { UserUniqueInfoRepository } from "./repository.ts";
import { buildOk } from "../../../lang/result.ts";

export class UserUniqueInfoRepositoryStub implements UserUniqueInfoRepository {
    constructor(
        private readonly numUsername: number,
        private readonly numEmail: number,
    ) {}

    public countUsername(): Promise<Result<number, RepositoryError>> {
        return Promise.resolve(buildOk(this.numUsername));
    }

    public countEmail(): Promise<Result<number, RepositoryError>> {
        return Promise.resolve(buildOk(this.numEmail));
    }
}

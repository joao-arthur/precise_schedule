import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { UserUniqueInfoRepository } from "./repository.ts";
import { ok } from "../../../lang/result.ts";

export class UserUniqueInfoRepositoryStub implements UserUniqueInfoRepository {
    constructor(
        private readonly numUsername: number,
        private readonly numEmail: number,
    ) {}

    public countUsername(): Promise<Result<number, RepositoryError>> {
        return Promise.resolve(ok(this.numUsername));
    }

    public countEmail(): Promise<Result<number, RepositoryError>> {
        return Promise.resolve(ok(this.numEmail));
    }
}

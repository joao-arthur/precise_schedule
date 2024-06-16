import type { Result } from "../../../lang/result.ts";
import type { RepoError } from "../../../repository/repo.ts";
import type { UserRepo } from "./repo.ts";
import { ok } from "../../../lang/result.ts";

export class UserUniqueInfoRepositoryStub implements UserRepo {
    constructor(
        private readonly numUsername: number,
        private readonly numEmail: number,
    ) {}

    public countUsername(): Promise<Result<number, RepoError>> {
        return Promise.resolve(ok(this.numUsername));
    }

    public countEmail(): Promise<Result<number, RepoError>> {
        return Promise.resolve(ok(this.numEmail));
    }
}

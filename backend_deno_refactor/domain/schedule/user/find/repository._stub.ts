import type { Result } from "../../../lang/result.ts";
import type { RepoError } from "../../../repository/repo.ts";
import type { UserRepo } from "./repo.ts";
import type { User } from "../model.ts";
import { ok } from "../../../lang/result.ts";

export class UserFindRepositoryStub implements UserRepo {
    constructor(private readonly user: User | undefined) {}

    public findById(): Promise<Result<User | undefined, RepoError>> {
        return Promise.resolve(ok(this.user));
    }

    public findByCredentials(): Promise<Result<User | undefined, RepoError>> {
        return Promise.resolve(ok(this.user));
    }
}

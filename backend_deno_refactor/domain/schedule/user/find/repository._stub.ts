import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { UserFindRepository } from "./repo.ts";
import type { User } from "../model.ts";
import { ok } from "../../../lang/result.ts";

export class UserFindRepositoryStub implements UserFindRepository {
    constructor(private readonly user: User | undefined) {}

    public findById(): Promise<Result<User | undefined, RepositoryError>> {
        return Promise.resolve(ok(this.user));
    }

    public findByCredentials(): Promise<Result<User | undefined, RepositoryError>> {
        return Promise.resolve(ok(this.user));
    }
}

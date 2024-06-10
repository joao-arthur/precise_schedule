import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { UserFindRepository } from "./repository.ts";
import type { User } from "../model.ts";
import { buildOk } from "../../../lang/result.ts";

export class UserFindRepositoryStub implements UserFindRepository {
    constructor(private readonly user: User | undefined) {}

    public findById(): Promise<Result<User | undefined, RepositoryError>> {
        return Promise.resolve(buildOk(this.user));
    }

    public findByCredentials(): Promise<Result<User | undefined, RepositoryError>> {
        return Promise.resolve(buildOk(this.user));
    }
}

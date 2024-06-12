import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { UserCreateRepository } from "./repository.ts";
import { ok } from "../../../lang/result.ts";

export class UserCreateRepositoryStub implements UserCreateRepository {
    public create(): Promise<Result<void, RepositoryError>> {
        return Promise.resolve(ok(undefined));
    }
}

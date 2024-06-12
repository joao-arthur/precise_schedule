import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { UserUpdateRepository } from "./repository.ts";
import { ok } from "../../../lang/result.ts";

export class UserUpdateRepositoryStub implements UserUpdateRepository {
    public update(): Promise<Result<void, RepositoryError>> {
        return Promise.resolve(ok(undefined));
    }
}

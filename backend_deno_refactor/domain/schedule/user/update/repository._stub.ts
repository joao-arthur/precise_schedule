import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { UserRepo } from "./repo.ts";
import { ok } from "../../../lang/result.ts";

export class UserUpdateRepositoryStub implements UserRepo {
    public update(): Promise<Result<void, RepositoryError>> {
        return Promise.resolve(ok(undefined));
    }
}

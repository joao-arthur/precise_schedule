import type { Result } from "../../../lang/result.ts";
import type { RepoError } from "../../../repository/repo.ts";
import type { UserRepo } from "./repo.ts";
import { ok } from "../../../lang/result.ts";

export class UserUpdateRepositoryStub implements UserRepo {
    public update(): Promise<Result<void, RepoError>> {
        return Promise.resolve(ok(undefined));
    }
}

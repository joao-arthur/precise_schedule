import type { Result } from "../../../lang/result.ts";
import type { UserCreateRepository } from "./repository.ts";
import { buildOk } from "../../../lang/result.ts";

export class UserCreateRepositoryStub implements UserCreateRepository {
    public create(): Promise<Result<void>> {
        return Promise.resolve(buildOk(undefined));
    }
}

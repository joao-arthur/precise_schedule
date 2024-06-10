import type { Result } from "../../../lang/result.ts";
import type { UserUpdateRepository } from "./repository.ts";
import { buildOk } from "../../../lang/result.ts";

export class UserUpdateRepositoryStub implements UserUpdateRepository {
    public update(): Promise<Result<void>> {
        return Promise.resolve(buildOk(undefined));
    }
}

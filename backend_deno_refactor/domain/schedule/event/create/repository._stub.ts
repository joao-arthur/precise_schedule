import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { EventCreateRepository } from "./repository.ts";
import { ok } from "../../../lang/result.ts";

export class EventCreateRepositoryStub implements EventCreateRepository {
    public create(): Promise<Result<void, RepositoryError>> {
        return Promise.resolve(ok(undefined));
    }
}

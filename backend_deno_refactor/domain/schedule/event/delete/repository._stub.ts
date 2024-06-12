import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { EventDeleteRepository } from "./repository.ts";
import { ok } from "../../../lang/result.ts";

export class EventDeleteRepositoryStub implements EventDeleteRepository {
    public del(): Promise<Result<void, RepositoryError>> {
        return Promise.resolve(ok(undefined));
    }
}

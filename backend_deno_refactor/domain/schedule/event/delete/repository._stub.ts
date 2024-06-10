import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { EventDeleteRepository } from "./repository.ts";
import { buildOk } from "../../../lang/result.ts";

export class EventDeleteRepositoryStub implements EventDeleteRepository {
    public del(): Promise<Result<void, RepositoryError>> {
        return Promise.resolve(buildOk(undefined));
    }
}

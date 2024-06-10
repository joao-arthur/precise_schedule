import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { EventUpdateRepository } from "./repository.ts";
import { buildOk } from "../../../lang/result.ts";

export class EventUpdateRepositoryStub implements EventUpdateRepository {
    public update(): Promise<Result<void, RepositoryError>> {
        return Promise.resolve(buildOk(undefined));
    }
}

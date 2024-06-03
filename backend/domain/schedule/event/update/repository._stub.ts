import type { Result } from "../../../lang/result.ts";
import type { RepositoryError } from "../../../repository/RepositoryError.ts";
import type { EventUpdateRepository } from "./repository.ts";

export class EventUpdateRepositoryStub implements EventUpdateRepository {
    public async update(): Promise<Result<void, RepositoryError>> {}
}

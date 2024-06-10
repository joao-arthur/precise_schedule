import type { Result } from "../../../lang/result.ts";
import type { Event } from "../model.ts";
import type { EventFindRepository } from "./repository.ts";
import { buildOk } from "../../../lang/result.ts";

export class EventFindRepositoryStub implements EventFindRepository {
    constructor(private readonly event: Event | undefined) {}

    public findByUser(): Promise<Result<readonly Event[]>> {
        return Promise.resolve(buildOk(this.event ? [this.event] : []));
    }

    public findByUserAndId(): Promise<Result<Event | undefined>> {
        return Promise.resolve(buildOk(this.event));
    }
}

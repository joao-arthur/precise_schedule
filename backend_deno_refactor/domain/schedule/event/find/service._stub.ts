import type { Result } from "../../../lang/result.ts";
import type { Event } from "../model.ts";
import type { EventFindModel } from "./model.ts";
import type { EventFindService, FindByUserAndIdErrors, FindByUserErrors } from "./service.ts";
import { buildOk } from "../../../lang/result.ts";

export class EventFindServiceStub implements EventFindService {
    constructor(
        private readonly event: Event,
        private readonly eventFind: EventFindModel,
    ) {}

    public findByUser(): Promise<Result<readonly Event[], FindByUserAndIdErrors>> {
        return Promise.resolve(buildOk([this.event]));
    }

    public findByUserMapped(): Promise<
        Result<readonly EventFindModel[], FindByUserAndIdErrors>
    > {
        return Promise.resolve(buildOk([this.eventFind]));
    }

    public findByUserAndId(): Promise<Result<Event, FindByUserErrors>> {
        return Promise.resolve(buildOk(this.event));
    }

    public findByUserAndIdMapped(): Promise<Result<EventFindModel, FindByUserErrors>> {
        return Promise.resolve(buildOk(this.eventFind));
    }
}

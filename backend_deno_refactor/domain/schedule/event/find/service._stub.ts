import type { Result } from "../../../lang/result.ts";
import type { Event } from "../model.ts";
import type { EventFindModel } from "./model.ts";
import type { EventFindService } from "./service.ts";
import type { EventNotFound } from "./error.eventNotFound.ts";
import { buildOk } from "../../../lang/result.ts";

export class EventFindServiceStub implements EventFindService {
    constructor(
        private readonly event: Event,
        private readonly eventFind: EventFindModel,
    ) {}

    public findByUser(): Promise<readonly Event[]> {
        return Promise.resolve([this.event]);
    }

    public findByUserMapped(): Promise<readonly EventFindModel[]> {
        return Promise.resolve([this.eventFind]);
    }

    public findByUserAndId(): Promise<Result<Event, EventNotFound>> {
        return Promise.resolve(buildOk(this.event));
    }

    public findByUserAndIdMapped(): Promise<Result<EventFindModel, EventNotFound>> {
        return Promise.resolve(buildOk(this.eventFind));
    }
}

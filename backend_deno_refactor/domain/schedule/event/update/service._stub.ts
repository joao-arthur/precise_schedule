import type { Result } from "../../../lang/result.ts";
import type { Event } from "../model.ts";
import type { EventUpdateErrors, EventUpdateService } from "./service.ts";
import { ok } from "../../../lang/result.ts";

export class EventUpdateServiceStub implements EventUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Result<Event, EventUpdateErrors>> {
        return Promise.resolve(ok(this.event));
    }
}

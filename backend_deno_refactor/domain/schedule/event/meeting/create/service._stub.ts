import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { MeetingCreateErrors, MeetingCreateService } from "./service.ts";
import { ok } from "../../../../lang/result.ts";

export class MeetingCreateServiceStub implements MeetingCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Result<Event, MeetingCreateErrors>> {
        return Promise.resolve(ok(this.event));
    }
}

import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { MeetingCreateErrors, MeetingCreateService } from "./service.ts";
import { buildOk } from "../../../../lang/result.ts";

export class MeetingCreateServiceStub implements MeetingCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Result<Event, MeetingCreateErrors>> {
        return Promise.resolve(buildOk(this.event));
    }
}

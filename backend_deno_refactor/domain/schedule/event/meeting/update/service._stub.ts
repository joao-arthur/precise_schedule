import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { MeetingUpdateErrors, MeetingUpdateService } from "./service.ts";
import { buildOk } from "../../../../lang/result.ts";

export class MeetingUpdateServiceStub implements MeetingUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Result<Event, MeetingUpdateErrors>> {
        return Promise.resolve(buildOk(this.event));
    }
}

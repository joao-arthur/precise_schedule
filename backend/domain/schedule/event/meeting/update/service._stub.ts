import type { Event } from "../../model.ts";
import type { MeetingUpdateService } from "./service.ts";

export class MeetingUpdateServiceStub implements MeetingUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

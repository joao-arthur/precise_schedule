import type { Event } from "../../model.ts";
import type { MeetingCreateService } from "./service.ts";

export class MeetingCreateServiceStub implements MeetingCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

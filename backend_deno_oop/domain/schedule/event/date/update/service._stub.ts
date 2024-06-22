import type { Event } from "../../model.ts";
import type { DateUpdateService } from "./service.ts";

export class DateUpdateServiceStub implements DateUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

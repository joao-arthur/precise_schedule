import type { Event } from "../../model.ts";
import type { DateCreateService } from "./service.ts";

export class DateCreateServiceStub implements DateCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

import type { Event } from "../../model.ts";
import type { BirthdayCreateService } from "./service.ts";

export class BirthdayCreateServiceStub implements BirthdayCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

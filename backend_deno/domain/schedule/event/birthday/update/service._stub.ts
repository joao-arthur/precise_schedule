import type { Event } from "../../model.ts";
import type { BirthdayUpdateService } from "./service.ts";

export class BirthdayUpdateServiceStub implements BirthdayUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

import type { Event } from "../../model.ts";
import type { PartyCreateService } from "./service.ts";

export class PartyCreateServiceStub implements PartyCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

import type { Event } from "../../model.ts";
import type { PartyUpdateService } from "./service.ts";

export class PartyUpdateServiceStub implements PartyUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

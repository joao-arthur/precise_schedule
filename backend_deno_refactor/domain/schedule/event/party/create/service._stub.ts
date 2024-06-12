import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { PartyCreateErrors, PartyCreateService } from "./service.ts";
import { buildOk } from "../../../../lang/result.ts";

export class PartyCreateServiceStub implements PartyCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Result<Event, PartyCreateErrors>> {
        return Promise.resolve(buildOk(this.event));
    }
}

import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { PartyUpdateErrors, PartyUpdateService } from "./service.ts";
import { ok } from "../../../../lang/result.ts";

export class PartyUpdateServiceStub implements PartyUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Result<Event, PartyUpdateErrors>> {
        return Promise.resolve(ok(this.event));
    }
}

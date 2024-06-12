import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { DateUpdateErrors, DateUpdateService } from "./service.ts";
import { ok } from "../../../../lang/result.ts";

export class DateUpdateServiceStub implements DateUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Result<Event, DateUpdateErrors>> {
        return Promise.resolve(ok(this.event));
    }
}

import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { DateCreateErrors, DateCreateService } from "./service.ts";
import { ok } from "../../../../lang/result.ts";

export class DateCreateServiceStub implements DateCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Result<Event, DateCreateErrors>> {
        return Promise.resolve(ok(this.event));
    }
}

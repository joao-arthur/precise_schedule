import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { AppointmentCreateErrors, AppointmentCreateService } from "./service.ts";
import { ok } from "../../../../lang/result.ts";

export class AppointmentCreateServiceStub implements AppointmentCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Result<Event, AppointmentCreateErrors>> {
        return Promise.resolve(ok(this.event));
    }
}

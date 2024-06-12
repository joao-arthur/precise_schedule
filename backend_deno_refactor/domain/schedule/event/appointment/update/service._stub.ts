import type { Result } from "../../../../lang/result.ts";
import type { Event } from "../../model.ts";
import type { AppointmentUpdateErrors, AppointmentUpdateService } from "./service.ts";
import { buildOk } from "../../../../lang/result.ts";

export class AppointmentUpdateServiceStub implements AppointmentUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Result<Event, AppointmentUpdateErrors>> {
        return Promise.resolve(buildOk(this.event));
    }
}

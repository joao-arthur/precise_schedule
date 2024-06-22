import type { Event } from "../../model.ts";
import type { AppointmentUpdateService } from "./service.ts";

export class AppointmentUpdateServiceStub implements AppointmentUpdateService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

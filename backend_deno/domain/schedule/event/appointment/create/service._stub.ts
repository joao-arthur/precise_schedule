import type { Event } from "../../model.ts";
import type { AppointmentCreateService } from "./service.ts";

export class AppointmentCreateServiceStub implements AppointmentCreateService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

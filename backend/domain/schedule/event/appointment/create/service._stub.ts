import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateAppointmentEventService } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEventService.ts";

export class CreateAppointmentEventServiceMock implements CreateAppointmentEventService {
    constructor(private readonly event: Event) {}

    public create(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

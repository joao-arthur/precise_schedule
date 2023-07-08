import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateAppointmentEventService } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEventService.ts";

export class UpdateAppointmentEventServiceMock
    implements UpdateAppointmentEventService {
    constructor(private readonly event: Event) {}

    public update(): Promise<Event> {
        return Promise.resolve(this.event);
    }
}

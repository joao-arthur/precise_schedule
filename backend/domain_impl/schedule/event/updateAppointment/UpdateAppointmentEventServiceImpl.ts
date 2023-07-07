import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateAppointmentEvent } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEvent.ts";
import type { UpdateAppointmentEventFactoryImpl } from "../updateAppointment/UpdateAppointmentEventFactoryImpl.ts";

export class UpdateAppointmentEventServiceImpl {
    constructor(
        private readonly factory: UpdateAppointmentEventFactoryImpl,
        private readonly service: UpdateEventService,
    ) {}

    public update(
        id: Event["id"],
        event: UpdateAppointmentEvent,
    ): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.update(id, buildedEvent);
    }
}

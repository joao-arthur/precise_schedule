import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateAppointmentEvent } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEvent.ts";
import type { CreateAppointmentEventFactory } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEventFactory.ts";
import type { CreateAppointmentEventService } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEventService.ts";

export class CreateAppointmentEventServiceImpl
    implements CreateAppointmentEventService {
    constructor(
        private readonly factory: CreateAppointmentEventFactory,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreateAppointmentEvent): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

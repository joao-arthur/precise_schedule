import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateAppointmentEvent } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEvent.ts";
import type { CreateAppointmentEventFactoryImpl } from "../createAppointment/CreateAppointmentEventFactoryImpl.ts";

export class CreateAppointmentEventServiceImpl {
    constructor(
        private readonly factory: CreateAppointmentEventFactoryImpl,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreateAppointmentEvent): Promise<Event> {
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

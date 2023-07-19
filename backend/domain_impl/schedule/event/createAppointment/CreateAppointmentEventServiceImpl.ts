import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { CreateEventService } from "@ps/domain/schedule/event/create/CreateEventService.ts";
import type { CreateAppointmentEvent } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEvent.ts";
import type { CreateAppointmentEventFactory } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEventFactory.ts";
import type { CreateAppointmentEventService } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEventService.ts";

import { createAppointmentValidation } from "@ps/domain/schedule/event/createAppointment/createAppointmentValidation.ts";

export class CreateAppointmentEventServiceImpl implements CreateAppointmentEventService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: CreateAppointmentEventFactory,
        private readonly service: CreateEventService,
    ) {}

    public create(event: CreateAppointmentEvent): Promise<Event> {
        this.validator.validate(event, createAppointmentValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.create(buildedEvent);
    }
}

import type { Validator } from "@ps/domain/validation/Validator.ts";
import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { UpdateAppointmentEvent } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEvent.ts";
import type { UpdateAppointmentEventFactory } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEventFactory.ts";
import type { UpdateAppointmentEventService } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEventService.ts";

import { updateAppointmentValidation } from "@ps/domain/schedule/event/updateAppointment/updateAppointmentValidation.ts";

export class UpdateAppointmentEventServiceImpl implements UpdateAppointmentEventService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: UpdateAppointmentEventFactory,
        private readonly service: UpdateEventService,
    ) {}

    public update(
        id: Event["id"],
        event: UpdateAppointmentEvent,
    ): Promise<Event> {
        this.validator.validate(event, updateAppointmentValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.update(id, buildedEvent);
    }
}

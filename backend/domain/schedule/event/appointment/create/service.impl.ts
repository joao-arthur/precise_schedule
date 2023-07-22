import type { Validator } from "../../../../validation/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { AppointmentCreateModel } from "./model.ts";
import type { AppointmentCreateFactory } from "./factory.ts";
import type { AppointmentCreateService } from "./service.ts";

import { createAppointmentValidation } from "./validation.ts";

export class AppointmentCreateServiceImpl implements AppointmentCreateService {
    constructor(
        private readonly validator: Validator,
        private readonly factory: AppointmentCreateFactory,
        private readonly service: EventCreateService,
    ) {}

    public create(userId: User["id"], event: AppointmentCreateModel): Promise<Event> {
        this.validator.validate(event, createAppointmentValidation);
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

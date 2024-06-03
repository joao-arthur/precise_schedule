import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { AppointmentCreateModel } from "./model.ts";
import type { AppointmentCreateFactory } from "./factory.ts";
import type { AppointmentCreateService } from "./service.ts";

import { buildErr, buildOk } from "../../../../lang/result.ts";
import { createAppointmentValidation } from "./validation.ts";

export class AppointmentCreateServiceImpl implements AppointmentCreateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly factory: AppointmentCreateFactory,
        private readonly service: EventCreateService,
    ) {}

    public create(userId: User["id"], event: AppointmentCreateModel): Promise<Event> {
        const modelValidation = this.validator.validate(event, createAppointmentValidation);
        if (modelValidation.type === "err") {
            return buildErr(modelValidation.error);
        }
        const buildedEvent = this.factory.build(event);
        return this.service.create(userId, buildedEvent);
    }
}

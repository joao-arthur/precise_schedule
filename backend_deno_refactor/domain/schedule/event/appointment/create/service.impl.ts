import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventCreateService } from "../../create/service.ts";
import type { AppointmentCreateModel } from "./model.ts";
import type { AppointmentCreateErrors, AppointmentCreateService } from "./service.ts";
import {buildEventCreate} from './factory.ts'
import { createAppointmentValidation } from "./validation.ts";

export class AppointmentCreateServiceImpl implements AppointmentCreateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly service: EventCreateService,
    ) {}

    public create(
        userId: User["id"],
        event: AppointmentCreateModel,
    ): Promise<Result<Event, AppointmentCreateErrors>> {
        const validationResult = this.validator.validate(event, createAppointmentValidation);
        if (validationResult.type === "err") {
            return Promise.resolve(validationResult);
        }
        const builtEvent = buildEventCreate(event);
        return this.service.create(userId, builtEvent);
    }
}

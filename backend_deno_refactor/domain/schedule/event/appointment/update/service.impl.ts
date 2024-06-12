import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventUpdateService } from "../../update/service.ts";
import type { AppointmentUpdateModel } from "./model.ts";
import type { AppointmentUpdateErrors, AppointmentUpdateService } from "./service.ts";
import {buildEventUpdate } from './factory.ts';
import { updateAppointmentValidation } from "./validation.ts";

export class AppointmentUpdateServiceImpl implements AppointmentUpdateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly service: EventUpdateService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: AppointmentUpdateModel,
    ): Promise<Result<Event, AppointmentUpdateErrors>> {
        const validationResult = this.validator.validate(event, updateAppointmentValidation);
        if (validationResult.type === "err") {
            return Promise.resolve(validationResult);
        }
        const builtEvent = buildEventUpdate(event);
        return this.service.update(userId, id, builtEvent);
    }
}

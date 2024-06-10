import type { Result } from "../../../../lang/result.ts";
import type { ValidatorService } from "../../../../validation/validator/service.ts";
import type { User } from "../../../user/model.ts";
import type { Event } from "../../model.ts";
import type { EventUpdateService } from "../../update/service.ts";
import type { AppointmentUpdateModel } from "./model.ts";
import type { AppointmentUpdateFactory } from "./factory.ts";
import type { AppointmentUpdateService } from "./service.ts";
import { updateAppointmentValidation } from "./validation.ts";

export class AppointmentUpdateServiceImpl implements AppointmentUpdateService {
    constructor(
        private readonly validator: ValidatorService,
        private readonly factory: AppointmentUpdateFactory,
        private readonly service: EventUpdateService,
    ) {}

    public update(
        userId: User["id"],
        id: Event["id"],
        event: AppointmentUpdateModel,
    ): Promise<Result<Event>> {
        const modelValidation = this.validator.validate(event, updateAppointmentValidation);
        if (modelValidation.type === "err") {
            return Promise.resolve(modelValidation);
        }
        const buildedEvent = this.factory.build(event);
        return this.service.update(userId, id, buildedEvent);
    }
}

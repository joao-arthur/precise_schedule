import type { CreateAppointmentEvent } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEvent.ts";
import type { CreateAppointmentEventService } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateAppointmentEventController } from "@ps/application/schedule/event/createAppointment/CreateAppointmentEventController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { created } from "@ps/application/http/builder/created.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class CreateAppointmentEventControllerImpl
    implements CreateAppointmentEventController {
    constructor(
        private readonly service: CreateAppointmentEventService,
    ) {}

    public async handle(
        request: HTTPRequest<CreateAppointmentEvent, undefined>,
    ): Promise<HTTPResponse> {
        try {
            await this.service.create(request.body);
            return created();
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}

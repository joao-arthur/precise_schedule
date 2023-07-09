import type { CreateAppointmentEvent } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEvent.ts";
import type { CreateAppointmentEventService } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateAppointmentEventController } from "@ps/application/schedule/event/createAppointment/CreateAppointmentEventController.ts";

import { created } from "@ps/application/http/builder/200/created.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class CreateAppointmentEventControllerImpl implements CreateAppointmentEventController {
    constructor(private readonly createAppointmentEventService: CreateAppointmentEventService) {}

    public handle(
        request: HTTPRequest<CreateAppointmentEvent>,
    ): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.createAppointmentEventService.create(request.body);
            return created();
        });
    }
}

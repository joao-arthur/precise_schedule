import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateAppointmentEvent } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdateAppointmentEventController } from "@ps/application/schedule/event/updateAppointment/UpdateAppointmentEventController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { noContent } from "@ps/application/http/builder/noContent.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { UpdateAppointmentEventServiceImpl } from "@ps/domain_impl/schedule/event/updateAppointment/UpdateAppointmentEventServiceImpl.ts";

export class UpdateAppointmentEventControllerImpl
    implements UpdateAppointmentEventController {
    constructor(
        private readonly service: UpdateAppointmentEventServiceImpl,
    ) {}

    public async handle(
        request: HTTPRequest<
            UpdateAppointmentEvent,
            IdParam<Event["id"]>
        >,
    ): Promise<HTTPResponse> {
        try {
            await this.service.update(
                request.params.id,
                request.body,
            );
            return noContent();
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}

import type { UpdateAppointmentEvent } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEvent.ts";
import type { UpdateAppointmentEventService } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdateAppointmentEventController } from "@ps/application/schedule/event/updateAppointment/UpdateAppointmentEventController.ts";

import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class UpdateAppointmentEventControllerImpl implements UpdateAppointmentEventController {
    constructor(private readonly updateAppointmentEventService: UpdateAppointmentEventService) {}

    public handle(req: HTTPRequest<UpdateAppointmentEvent, IdParam>): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.updateAppointmentEventService.update(req.params.id, req.body);
            return noContent();
        });
    }
}

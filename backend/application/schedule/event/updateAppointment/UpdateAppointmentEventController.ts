import type { UpdateAppointmentEvent } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

export type UpdateAppointmentEventController = {
    readonly handle: (req: HTTPRequest<UpdateAppointmentEvent, IdParam>) => Promise<HTTPResponse>;
};

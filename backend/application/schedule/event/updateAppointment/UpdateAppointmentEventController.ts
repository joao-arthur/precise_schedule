import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateAppointmentEvent } from "@ps/domain/schedule/event/updateAppointment/UpdateAppointmentEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

export type UpdateAppointmentEventController = {
    readonly handle: (
        request: HTTPRequest<
            UpdateAppointmentEvent,
            IdParam<Event["id"]>
        >,
    ) => Promise<HTTPResponse>;
};

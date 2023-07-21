import type { User } from "@ps/domain/schedule/user/User.ts";
import type { CreateAppointmentEvent } from "@ps/domain/schedule/event/createAppointment/CreateAppointmentEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type CreateAppointmentEventController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<CreateAppointmentEvent>,
    ) => Promise<HTTPResponse>;
};

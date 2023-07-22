import type { User } from "@ps/domain/schedule/user/model.ts";
import type { AppointmentCreateModel } from "@ps/domain/schedule/event/appointment/create/model.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";

export type AppointmentCreateController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<AppointmentCreateModel>,
    ) => Promise<HTTPResponse>;
};

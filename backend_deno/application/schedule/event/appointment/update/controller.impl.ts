import type { User } from "@ps/domain/schedule/user/model.ts";
import type { AppointmentUpdateModel } from "@ps/domain/schedule/event/appointment/update/model.ts";
import type { AppointmentUpdateService } from "@ps/domain/schedule/event/appointment/update/service.ts";
import type { HTTPRequest } from "../../../../http/request/model.ts";
import type { HTTPResponse } from "../../../../http/response/model.ts";
import type { IdParam } from "../../../../http/IdParam.ts";
import type { AppointmentUpdateController } from "./controller.ts";

import { noContent } from "../../../../http/response/noContent/builder.ts";

export class AppointmentUpdateControllerImpl implements AppointmentUpdateController {
    constructor(private readonly appointmentUpdateService: AppointmentUpdateService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<AppointmentUpdateModel, IdParam>,
    ): Promise<HTTPResponse> {
        await this.appointmentUpdateService.update(userId, req.params.id, req.body);
        return noContent();
    }
}

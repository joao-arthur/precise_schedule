import type { User } from "@ps/domain/schedule/user/model.ts";
import type { AppointmentCreateModel } from "@ps/domain/schedule/event/appointment/create/model.ts";
import type { AppointmentCreateService } from "@ps/domain/schedule/event/appointment/create/service.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { AppointmentCreateController } from "./controller.ts";

import { created } from "../../../http/response/created/builder.ts";

export class AppointmentCreateControllerImpl implements AppointmentCreateController {
    constructor(private readonly appointmentCreateService: AppointmentCreateService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<AppointmentCreateModel>,
    ): Promise<HTTPResponse> {
        const result = await this.appointmentCreateService.create(userId, req.body);
        return created(result);
    }
}

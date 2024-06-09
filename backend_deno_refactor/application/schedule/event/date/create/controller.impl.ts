import type { User } from "@ps/domain/schedule/user/model.ts";
import type { DateCreateModel } from "@ps/domain/schedule/event/date/create/model.ts";
import type { DateCreateService } from "@ps/domain/schedule/event/date/create/service.ts";
import type { HTTPRequest } from "../../../../http/request/model.ts";
import type { HTTPResponse } from "../../../../http/response/model.ts";
import type { DateCreateController } from "./controller.ts";
import { created } from "../../../../http/response/created/builder.ts";

export class DateCreateControllerImpl implements DateCreateController {
    constructor(private readonly dateCreateService: DateCreateService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<DateCreateModel>,
    ): Promise<HTTPResponse> {
        const result = await this.dateCreateService.create(userId, req.body);
        return created(result);
    }
}

import type { User } from "@ps/domain/schedule/user/model.ts";
import type { DateUpdateModel } from "@ps/domain/schedule/event/date/update/model.ts";
import type { DateUpdateService } from "@ps/domain/schedule/event/date/update/service.ts";
import type { HTTPRequest } from "../../../../http/request/model.ts";
import type { HTTPResponse } from "../../../../http/response/model.ts";
import type { IdParam } from "../../../../http/IdParam.ts";
import type { DateUpdateController } from "./controller.ts";
import { noContent } from "../../../../http/response/noContent/builder.ts";

export class DateUpdateControllerImpl implements DateUpdateController {
    constructor(private readonly dateUpdateService: DateUpdateService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<DateUpdateModel, IdParam>,
    ): Promise<HTTPResponse> {
        await this.dateUpdateService.update(userId, req.params.id, req.body);
        return noContent();
    }
}

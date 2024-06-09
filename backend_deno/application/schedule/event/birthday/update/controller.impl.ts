import type { User } from "@ps/domain/schedule/user/model.ts";
import type { BirthdayUpdateModel } from "@ps/domain/schedule/event/birthday/update/model.ts";
import type { BirthdayUpdateService } from "@ps/domain/schedule/event/birthday/update/service.ts";
import type { HTTPRequest } from "../../../../http/request/model.ts";
import type { HTTPResponse } from "../../../../http/response/model.ts";
import type { IdParam } from "../../../../http/IdParam.ts";
import type { BirthdayUpdateController } from "./controller.ts";

import { noContent } from "../../../../http/response/noContent/builder.ts";

export class BirthdayUpdateControllerImpl implements BirthdayUpdateController {
    constructor(private readonly birthdayUpdateService: BirthdayUpdateService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<BirthdayUpdateModel, IdParam>,
    ): Promise<HTTPResponse> {
        await this.birthdayUpdateService.update(userId, req.params.id, req.body);
        return noContent();
    }
}

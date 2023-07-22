import type { User } from "@ps/domain/schedule/user/model.ts";
import type { BirthdayCreateModel } from "@ps/domain/schedule/event/birthday/create/model.ts";
import type { BirthdayCreateService } from "@ps/domain/schedule/event/birthday/create/service.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { BirthdayCreateController } from "./controller.ts";

import { created } from "../../../http/response/created/builder.ts";

export class BirthdayCreateControllerImpl implements BirthdayCreateController {
    constructor(private readonly birthdayCreateService: BirthdayCreateService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<BirthdayCreateModel>,
    ): Promise<HTTPResponse> {
        const result = await this.birthdayCreateService.create(userId, req.body);
        return created(result);
    }
}

import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { FindUserController } from "@ps/application/schedule/user/find/FindUserController.ts";

import { ok } from "@ps/application_impl/http/builder/200/ok.ts";

export class FindUserControllerImpl implements FindUserController {
    constructor(private readonly findUserService: FindUserService) {}

    public async handle(userId: User["id"]): Promise<HTTPResponse> {
        const result = await this.findUserService.findById(userId);
        return ok(result);
    }
}

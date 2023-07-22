import type { User } from "@ps/domain/schedule/user/model.ts";
import type { UserFindService } from "@ps/domain/schedule/user/find/service.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { UserFindController } from "./controller.ts";

import { ok } from "../../../http/response/ok/builder.ts";

export class UserFindControllerImpl implements UserFindController {
    constructor(private readonly userFindService: UserFindService) {}

    public async handle(userId: User["id"]): Promise<HTTPResponse> {
        const result = await this.userFindService.findByIdMapped(userId);
        return ok(result);
    }
}

import type { User } from "@ps/domain/schedule/user/model.ts";
import type { UserFindService } from "@ps/domain/schedule/user/find/service.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { UserFindController } from "./controller.ts";

import { ok } from "../../../http/response/ok/builder.ts";
import { badRequest } from "../../../http/response/badRequest/builder.ts";

export class UserFindControllerImpl implements UserFindController {
    constructor(private readonly userFindService: UserFindService) {}

    public async handle(userId: User["id"]): Promise<HTTPResponse> {
        const result = await this.userFindService.findByIdMapped(userId);
        switch (result.type) {
            case "ok":
                return ok(result.data);
            case "err":
                return badRequest({ message: result.error.message });
        }
    }
}

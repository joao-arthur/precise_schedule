import type { User } from "@ps/domain/schedule/user/model.ts";
import type { UserUpdate } from "@ps/domain/schedule/user/update/model.ts";
import type { UserUpdateService } from "@ps/domain/schedule/user/update/service.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { UserUpdateController } from "./controller.ts";
import { noContent } from "../../../http/response/noContent/builder.ts";

export class UserUpdateControllerImpl implements UserUpdateController {
    constructor(private readonly userUpdateService: UserUpdateService) { }

    public async handle(
        userId: User["id"],
        req: HTTPRequest<UserUpdate>,
    ): Promise<HTTPResponse> {
        await this.userUpdateService.update(userId, req.body);
        return noContent();
    }
}

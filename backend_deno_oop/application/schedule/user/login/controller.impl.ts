import type { UserLoginModel } from "@ps/domain/schedule/user/login/model.ts";
import type { UserLoginService } from "@ps/domain/schedule/user/login/service.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { UserLoginController } from "./controller.ts";
import { ok } from "../../../http/response/ok/builder.ts";

export class UserLoginControllerImpl implements UserLoginController {
    constructor(private readonly userLoginService: UserLoginService) {}

    public async handle(req: HTTPRequest<UserLoginModel>): Promise<HTTPResponse> {
        const result = await this.userLoginService.userLogin(req.body);
        return ok(result);
    }
}

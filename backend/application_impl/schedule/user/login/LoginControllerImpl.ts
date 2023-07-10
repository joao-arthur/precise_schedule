import type { LoginModel } from "@ps/domain/schedule/user/login/LoginModel.ts";
import type { LoginService } from "@ps/domain/schedule/user/login/LoginService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { LoginController } from "@ps/application/schedule/user/login/LoginController.ts";

import { ok } from "@ps/application_impl/http/builder/200/ok.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class LoginControllerImpl implements LoginController {
    constructor(private readonly loginService: LoginService) {}

    public handle(
        request: HTTPRequest<LoginModel>,
    ): Promise<HTTPResponse> {
        return errorHandler(async () => {
            const result = await this.loginService.login(request.body);
            return ok(result);
        });
    }
}

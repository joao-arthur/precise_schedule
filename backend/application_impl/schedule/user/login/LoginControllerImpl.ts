import type { ValidationResult } from "@ps/domain/validation/ValidationResult.ts";
import type { Session } from "@ps/domain/session/Session.ts";
import type { LoginModel } from "@ps/domain/schedule/user/login/LoginModel.ts";
import type { LoginService } from "@ps/domain/schedule/user/login/LoginService.ts";
import type { LoginController } from "@ps/application/schedule/user/login/LoginController.ts";
import type { ErrorResponse } from "@ps/application/http/ErrorResponse.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { ok } from "@ps/application/http/builder/ok.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class LoginControllerImpl implements LoginController {
    constructor(private readonly service: LoginService) {}

    public async handle(
        request: HTTPRequest<LoginModel, never>,
    ): Promise<
        HTTPResponse<Session | ValidationResult | ErrorResponse>
    > {
        try {
            const result = await this.service.login(request.body);
            return ok(result);
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}

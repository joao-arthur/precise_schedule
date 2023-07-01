import type { ValidationResult } from "@ps/domain/validation/ValidationResult.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";
import type { FindUserController } from "@ps/application/schedule/user/find/FindUserController.ts";
import type { ErrorResponse } from "@ps/application/http/ErrorResponse.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { ok } from "@ps/application/http/builder/ok.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class FindUserControllerImpl implements FindUserController {
    constructor(private readonly service: FindUserService) {}

    public handle(
        request: HTTPRequest<never, IdParam<User["id"]>>,
    ): HTTPResponse<User | ValidationResult | ErrorResponse> {
        try {
            const result = this.service.findById(request.params.id);
            return ok(result);
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}

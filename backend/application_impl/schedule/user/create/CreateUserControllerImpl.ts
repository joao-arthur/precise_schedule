import type { ValidationResult } from "@ps/domain/validation/ValidationResult.ts";
import type { User } from "@ps/domain/schedule/user/User.ts";
import type { CreateUserModel } from "@ps/domain/schedule/user/create/CreateUserModel.ts";
import type { CreateUserService } from "@ps/domain/schedule/user/create/CreateUserService.ts";
import type { CreateUserController } from "@ps/application/schedule/user/create/CreateUserController.ts";
import type { ErrorResponse } from "@ps/application/http/ErrorResponse.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { ok } from "@ps/application/http/builder/ok.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class CreateUserControllerImpl
    implements CreateUserController {
    constructor(private readonly service: CreateUserService) {}

    public handle(
        request: HTTPRequest<CreateUserModel, never>,
    ): HTTPResponse<User | ValidationResult | ErrorResponse> {
        try {
            const result = this.service.create(request.body);
            return ok(result);
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}

import type { CreateUserModel } from "@ps/domain/schedule/user/create/CreateUserModel.ts";
import type { CreateUserService } from "@ps/domain/schedule/user/create/CreateUserService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateUserController } from "@ps/application/schedule/user/create/CreateUserController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { created } from "@ps/application/http/builder/created.ts";

export class CreateUserControllerImpl
    implements CreateUserController {
    constructor(
        private readonly createUserService: CreateUserService,
    ) {}

    public async handle(
        request: HTTPRequest<CreateUserModel, undefined>,
    ): Promise<HTTPResponse> {
        try {
            await this.createUserService.create(request.body);
            return created();
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}

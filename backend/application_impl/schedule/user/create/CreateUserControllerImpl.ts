import type { CreateUserModel } from "@ps/domain/schedule/user/create/CreateUserModel.ts";
import type { CreateUserService } from "@ps/domain/schedule/user/create/CreateUserService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateUserController } from "@ps/application/schedule/user/create/CreateUserController.ts";

import { created } from "@ps/application/http/builder/created.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class CreateUserControllerImpl
    implements CreateUserController {
    constructor(
        private readonly createUserService: CreateUserService,
    ) {}

    public handle(
        request: HTTPRequest<CreateUserModel, undefined>,
    ): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.createUserService.create(request.body);
            return created();
        });
    }
}

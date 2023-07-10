import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UpdateUserModel } from "@ps/domain/schedule/user/update/UpdateUserModel.ts";
import type { UpdateUserService } from "@ps/domain/schedule/user/update/UpdateUserService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdateUserController } from "@ps/application/schedule/user/update/UpdateUserController.ts";

import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class UpdateUserControllerImpl implements UpdateUserController {
    constructor(private readonly updateUserService: UpdateUserService) {}

    public handle(req: HTTPRequest<UpdateUserModel, IdParam<User["id"]>>): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.updateUserService.update(req.params.id, req.body);
            return noContent();
        });
    }
}

import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { FindUserController } from "@ps/application/schedule/user/find/FindUserController.ts";

import { ok } from "@ps/application_impl/http/builder/200/ok.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class FindUserControllerImpl implements FindUserController {
    constructor(private readonly findUserService: FindUserService) {}

    public handle(req: HTTPRequest<undefined, IdParam<User["id"]>>): Promise<HTTPResponse> {
        return errorHandler(async () => {
            const result = await this.findUserService.findById(req.params.id);
            return ok(result);
        });
    }
}

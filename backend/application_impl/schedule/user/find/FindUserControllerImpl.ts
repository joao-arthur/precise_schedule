import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindUserService } from "@ps/domain/schedule/user/find/FindUserService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { ok } from "@ps/application/http/builder/ok.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class FindUserControllerImpl {
    constructor(private readonly service: FindUserService) {}

    public async handle(
        request: HTTPRequest<never, IdParam<User["id"]>>,
    ): Promise<HTTPResponse> {
        try {
            const result = await this.service.findById(
                request.params.id,
            );
            return ok(result);
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}

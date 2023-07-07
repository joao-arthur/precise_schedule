import type { UpdateBirthdayEvent } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { noContent } from "@ps/application/http/builder/noContent.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { UpdateBirthdayEventServiceImpl } from "@ps/domain_impl/schedule/event/updateBirthday/UpdateBirthdayEventServiceImpl.ts";

export class UpdateBirthdayEventControllerImpl {
    constructor(
        private readonly service: UpdateBirthdayEventServiceImpl,
    ) {}

    public async handle(
        request: HTTPRequest<UpdateBirthdayEvent, IdParam<string>>,
    ): Promise<HTTPResponse> {
        try {
            await this.service.update(
                request.params.id,
                request.body,
            );
            return noContent();
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}

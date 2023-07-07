import type { UpdateDateEvent } from "@ps/domain/schedule/event/updateDate/UpdateDateEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdateDateEventController } from "@ps/application/schedule/event/updateDate/UpdateDateEventController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { noContent } from "@ps/application/http/builder/noContent.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { UpdateDateEventServiceImpl } from "@ps/domain_impl/schedule/event/updateDate/UpdateDateEventServiceImpl.ts";

export class UpdateDateEventControllerImpl
    implements UpdateDateEventController {
    constructor(
        private readonly service: UpdateDateEventServiceImpl,
    ) {}

    public async handle(
        request: HTTPRequest<UpdateDateEvent, IdParam<string>>,
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

import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateEventModel } from "@ps/domain/schedule/event/update/UpdateEventModel.ts";
import type { UpdateEventService } from "@ps/domain/schedule/event/update/UpdateEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { ok } from "@ps/application/http/builder/ok.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class UpdateEventControllerImpl {
    constructor(private readonly service: UpdateEventService) {}

    public async handle(
        request: HTTPRequest<UpdateEventModel, IdParam<Event["id"]>>,
    ): Promise<HTTPResponse> {
        try {
            const result = await this.service.update(
                request.params.id,
                request.body,
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

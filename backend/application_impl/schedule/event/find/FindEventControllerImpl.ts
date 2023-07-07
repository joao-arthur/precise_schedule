import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { FindEventService } from "@ps/domain/schedule/event/find/FindEventService.ts";
import type { FindEventController } from "@ps/application/schedule/event/find/FindEventController.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { ok } from "@ps/application/http/builder/ok.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class FindEventControllerImpl implements FindEventController {
    constructor(private readonly service: FindEventService) {}

    public async handle(
        request: HTTPRequest<never, IdParam<Event["id"]>>,
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

import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { FindEventService } from "@ps/domain/schedule/event/find/FindEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { FindEventController } from "@ps/application/schedule/event/find/FindEventController.ts";

import { ok } from "@ps/application/http/builder/200/ok.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class FindEventControllerImpl implements FindEventController {
    constructor(private readonly findEventService: FindEventService) {}

    public handle(
        request: HTTPRequest<undefined, IdParam<Event["id"]>>,
    ): Promise<HTTPResponse> {
        return errorHandler(async () => {
            const result = await this.findEventService.findById(request.params.id);
            return ok(result);
        });
    }
}

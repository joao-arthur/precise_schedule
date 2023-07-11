import type { FindEventService } from "@ps/domain/schedule/event/find/FindEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { FindEventController } from "@ps/application/schedule/event/find/FindEventController.ts";

import { ok } from "@ps/application_impl/http/builder/200/ok.ts";

export class FindEventControllerImpl implements FindEventController {
    constructor(private readonly findEventService: FindEventService) {}

    public async handle(req: HTTPRequest<undefined, IdParam>): Promise<HTTPResponse> {
        const result = await this.findEventService.findById(req.params.id);
        return ok(result);
    }
}

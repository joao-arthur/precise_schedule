import type { User } from "@ps/domain/schedule/user/User.ts";
import type { DeleteEventService } from "@ps/domain/schedule/event/delete/DeleteEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { DeleteEventController } from "@ps/application/schedule/event/delete/DeleteEventController.ts";

import { ok } from "@ps/application_impl/http/builder/200/ok.ts";

export class DeleteEventControllerImpl implements DeleteEventController {
    constructor(private readonly deleteEventService: DeleteEventService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<undefined, IdParam>,
    ): Promise<HTTPResponse> {
        const result = await this.deleteEventService.del(userId, req.params.id);
        return ok(result);
    }
}

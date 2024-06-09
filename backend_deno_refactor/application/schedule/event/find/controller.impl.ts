import type { User } from "@ps/domain/schedule/user/model.ts";
import type { EventFindService } from "@ps/domain/schedule/event/find/service.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { IdParam } from "../../../http/IdParam.ts";
import type { EventFindController } from "./controller.ts";

import { ok } from "../../../http/response/ok/builder.ts";
import { badRequest } from "../../../http/response/badRequest/builder.ts";

export class EventFindControllerImpl implements EventFindController {
    constructor(private readonly eventFindService: EventFindService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<undefined, IdParam>,
    ): Promise<HTTPResponse> {
        const result = await this.eventFindService.findByUserAndIdMapped(userId, req.params.id);
        switch (result.type) {
            case "ok":
                return ok(result.data);
            case "err":
                return badRequest({ message: result.error.message });
        }
    }
}

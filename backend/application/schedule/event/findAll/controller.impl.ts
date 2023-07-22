import type { User } from "@ps/domain/schedule/user/model.ts";
import type { EventFindService } from "@ps/domain/schedule/event/find/service.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { FindAllEventController } from "./controller.ts";

import { ok } from "../../../http/response/ok/builder.ts";

export class FindAllEventControllerImpl implements FindAllEventController {
    constructor(private readonly eventFindService: EventFindService) {}

    public async handle(
        userId: User["id"],
    ): Promise<HTTPResponse> {
        const result = await this.eventFindService.findByUser(userId);
        return ok(result);
    }
}

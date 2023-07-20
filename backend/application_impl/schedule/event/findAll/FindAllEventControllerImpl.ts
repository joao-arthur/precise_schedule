import type { User } from "@ps/domain/schedule/user/User.ts";
import type { FindEventService } from "@ps/domain/schedule/event/find/FindEventService.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { FindAllEventController } from "@ps/application/schedule/event/findAll/FindAllEventController.ts";

import { ok } from "@ps/application_impl/http/builder/200/ok.ts";

export class FindAllEventControllerImpl implements FindAllEventController {
    constructor(private readonly findEventService: FindEventService) {}

    public async handle(
        userId: User["id"],
    ): Promise<HTTPResponse> {
        const result = await this.findEventService.findByUser(userId);
        // fix type
        return ok(result);
    }
}

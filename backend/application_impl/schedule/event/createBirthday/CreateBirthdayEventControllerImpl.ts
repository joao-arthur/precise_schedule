import type { User } from "@ps/domain/schedule/user/User.ts";
import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";
import type { CreateBirthdayEventService } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateBirthdayEventController } from "@ps/application/schedule/event/createBirthday/CreateBirthdayEventController.ts";

import { created } from "@ps/application_impl/http/builder/200/created.ts";

export class CreateBirthdayEventControllerImpl implements CreateBirthdayEventController {
    constructor(private readonly createBirthdayEventService: CreateBirthdayEventService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<CreateBirthdayEvent>,
    ): Promise<HTTPResponse> {
        const result = await this.createBirthdayEventService.create(userId, req.body);
        return created(result);
    }
}

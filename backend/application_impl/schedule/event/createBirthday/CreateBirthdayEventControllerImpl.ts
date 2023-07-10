import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";
import type { CreateBirthdayEventService } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateBirthdayEventController } from "@ps/application/schedule/event/createBirthday/CreateBirthdayEventController.ts";

import { created } from "@ps/application_impl/http/builder/200/created.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class CreateBirthdayEventControllerImpl implements CreateBirthdayEventController {
    constructor(private readonly createBirthdayEventService: CreateBirthdayEventService) {}

    public handle(
        request: HTTPRequest<CreateBirthdayEvent>,
    ): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.createBirthdayEventService.create(request.body);
            return created();
        });
    }
}

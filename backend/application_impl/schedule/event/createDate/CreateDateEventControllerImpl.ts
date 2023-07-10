import type { CreateDateEvent } from "@ps/domain/schedule/event/createDate/CreateDateEvent.ts";
import type { CreateDateEventService } from "@ps/domain/schedule/event/createDate/CreateDateEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateDateEventController } from "@ps/application/schedule/event/createDate/CreateDateEventController.ts";

import { created } from "@ps/application_impl/http/builder/200/created.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class CreateDateEventControllerImpl implements CreateDateEventController {
    constructor(private readonly createDateEventService: CreateDateEventService) {}

    public handle(req: HTTPRequest<CreateDateEvent>): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.createDateEventService.create(req.body);
            return created();
        });
    }
}

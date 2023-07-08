import type { CreateDateEvent } from "@ps/domain/schedule/event/createDate/CreateDateEvent.ts";
import type { CreateDateEventService } from "@ps/domain/schedule/event/createDate/CreateDateEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateDateEventController } from "@ps/application/schedule/event/createDate/CreateDateEventController.ts";

import { created } from "@ps/application/http/builder/created.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class CreateDateEventControllerImpl
    implements CreateDateEventController {
    constructor(
        private readonly createDateEventService:
            CreateDateEventService,
    ) {}

    public handle(
        request: HTTPRequest<CreateDateEvent, undefined>,
    ): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.createDateEventService.create(request.body);
            return created();
        });
    }
}

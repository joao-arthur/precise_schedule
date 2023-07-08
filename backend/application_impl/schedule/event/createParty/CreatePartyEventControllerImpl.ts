import type { CreatePartyEvent } from "@ps/domain/schedule/event/createParty/CreatePartyEvent.ts";
import type { CreatePartyEventService } from "@ps/domain/schedule/event/createParty/CreatePartyEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreatePartyEventController } from "@ps/application/schedule/event/createParty/CreatePartyEventController.ts";

import { created } from "@ps/application/http/builder/created.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class CreatePartyEventControllerImpl
    implements CreatePartyEventController {
    constructor(
        private readonly createPartyEventService:
            CreatePartyEventService,
    ) {}

    public handle(
        request: HTTPRequest<CreatePartyEvent, undefined>,
    ): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.createPartyEventService.create(request.body);
            return created();
        });
    }
}

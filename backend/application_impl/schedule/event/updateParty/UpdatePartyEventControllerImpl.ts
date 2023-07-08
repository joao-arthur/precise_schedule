import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";
import type { UpdatePartyEventService } from "@ps/domain/schedule/event/updateParty/UpdatePartyEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdatePartyEventController } from "@ps/application/schedule/event/updateParty/UpdatePartyEventController.ts";

import { noContent } from "@ps/application/http/builder/noContent.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class UpdatePartyEventControllerImpl
    implements UpdatePartyEventController {
    constructor(
        private readonly updatePartyEventService:
            UpdatePartyEventService,
    ) {}

    public handle(
        request: HTTPRequest<UpdatePartyEvent, IdParam<Event["id"]>>,
    ): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.updatePartyEventService.update(
                request.params.id,
                request.body,
            );
            return noContent();
        });
    }
}

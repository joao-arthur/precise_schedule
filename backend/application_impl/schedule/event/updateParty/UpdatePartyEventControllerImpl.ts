import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";
import type { UpdatePartyEventService } from "@ps/domain/schedule/event/updateParty/UpdatePartyEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdatePartyEventController } from "@ps/application/schedule/event/updateParty/UpdatePartyEventController.ts";

import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class UpdatePartyEventControllerImpl implements UpdatePartyEventController {
    constructor(private readonly updatePartyEventService: UpdatePartyEventService) {}

    public handle(req: HTTPRequest<UpdatePartyEvent, IdParam>): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.updatePartyEventService.update(req.params.id, req.body);
            return noContent();
        });
    }
}

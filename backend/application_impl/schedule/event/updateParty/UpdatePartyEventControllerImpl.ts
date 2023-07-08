import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";
import type { UpdatePartyEventService } from "@ps/domain/schedule/event/updateParty/UpdatePartyEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdatePartyEventController } from "@ps/application/schedule/event/updateParty/UpdatePartyEventController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { noContent } from "@ps/application/http/builder/noContent.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class UpdatePartyEventControllerImpl
    implements UpdatePartyEventController {
    constructor(
        private readonly service: UpdatePartyEventService,
    ) {}

    public async handle(
        request: HTTPRequest<UpdatePartyEvent, IdParam<Event["id"]>>,
    ): Promise<HTTPResponse> {
        try {
            await this.service.update(
                request.params.id,
                request.body,
            );
            return noContent();
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}

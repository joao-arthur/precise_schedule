import type { CreatePartyEvent } from "@ps/domain/schedule/event/createParty/CreatePartyEvent.ts";
import type { CreatePartyEventService } from "@ps/domain/schedule/event/createParty/CreatePartyEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreatePartyEventController } from "@ps/application/schedule/event/createParty/CreatePartyEventController.ts";

import { created } from "@ps/application_impl/http/builder/200/created.ts";

export class CreatePartyEventControllerImpl implements CreatePartyEventController {
    constructor(private readonly createPartyEventService: CreatePartyEventService) {}

    public async handle(req: HTTPRequest<CreatePartyEvent>): Promise<HTTPResponse> {
        await this.createPartyEventService.create(req.body);
        return created();
    }
}

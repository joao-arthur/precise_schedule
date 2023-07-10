import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateDateEvent } from "@ps/domain/schedule/event/updateDate/UpdateDateEvent.ts";
import type { UpdateDateEventService } from "@ps/domain/schedule/event/updateDate/UpdateDateEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdateDateEventController } from "@ps/application/schedule/event/updateDate/UpdateDateEventController.ts";

import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class UpdateDateEventControllerImpl implements UpdateDateEventController {
    constructor(private readonly updateDateEventService: UpdateDateEventService) {}

    public handle(req: HTTPRequest<UpdateDateEvent, IdParam<Event["id"]>>): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.updateDateEventService.update(req.params.id, req.body);
            return noContent();
        });
    }
}

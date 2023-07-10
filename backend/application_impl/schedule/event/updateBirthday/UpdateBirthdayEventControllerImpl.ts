import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateBirthdayEvent } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEvent.ts";
import type { UpdateBirthdayEventService } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdateBirthdayEventController } from "@ps/application/schedule/event/updateBirthday/UpdateBirthdayEventController.ts";

import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class UpdateBirthdayEventControllerImpl implements UpdateBirthdayEventController {
    constructor(private readonly updateBirthdayEventService: UpdateBirthdayEventService) {}

    public handle(
        req: HTTPRequest<UpdateBirthdayEvent, IdParam<Event["id"]>>,
    ): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.updateBirthdayEventService.update(req.params.id, req.body);
            return noContent();
        });
    }
}

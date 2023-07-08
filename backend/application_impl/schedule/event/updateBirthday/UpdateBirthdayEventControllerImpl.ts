import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateBirthdayEvent } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEvent.ts";
import type { UpdateBirthdayEventService } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdateBirthdayEventController } from "@ps/application/schedule/event/updateBirthday/UpdateBirthdayEventController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { noContent } from "@ps/application/http/builder/noContent.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class UpdateBirthdayEventControllerImpl
    implements UpdateBirthdayEventController {
    constructor(
        private readonly updateBirthdayEventService:
            UpdateBirthdayEventService,
    ) {}

    public async handle(
        request: HTTPRequest<
            UpdateBirthdayEvent,
            IdParam<Event["id"]>
        >,
    ): Promise<HTTPResponse> {
        try {
            await this.updateBirthdayEventService.update(
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

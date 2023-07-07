import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateMeetingEvent } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdateMeetingEventController } from "@ps/application/schedule/event/updateMeeting/UpdateMeetingEventController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { noContent } from "@ps/application/http/builder/noContent.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { UpdateMeetingEventServiceImpl } from "@ps/domain_impl/schedule/event/updateMeeting/UpdateMeetingEventServiceImpl.ts";

export class UpdateMeetingEventControllerImpl
    implements UpdateMeetingEventController {
    constructor(
        private readonly service: UpdateMeetingEventServiceImpl,
    ) {}

    public async handle(
        request: HTTPRequest<
            UpdateMeetingEvent,
            IdParam<Event["id"]>
        >,
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

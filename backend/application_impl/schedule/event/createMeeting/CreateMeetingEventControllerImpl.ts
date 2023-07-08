import type { CreateMeetingEvent } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEvent.ts";
import type { CreateMeetingEventService } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateMeetingEventController } from "@ps/application/schedule/event/createMeeting/CreateMeetingEventController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { created } from "@ps/application/http/builder/created.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";

export class CreateMeetingEventControllerImpl
    implements CreateMeetingEventController {
    constructor(
        private readonly service: CreateMeetingEventService,
    ) {}

    public async handle(
        request: HTTPRequest<CreateMeetingEvent, undefined>,
    ): Promise<HTTPResponse> {
        try {
            await this.service.create(request.body);
            return created();
        } catch (e: unknown) {
            if (e instanceof ValidationError) {
                return badRequest(e.result);
            }
            return internalServerError();
        }
    }
}

import type { CreateMeetingEvent } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateMeetingEventController } from "@ps/application/schedule/event/createMeeting/CreateMeetingEventController.ts";

import { ValidationError } from "@ps/domain/validation/ValidationError.ts";
import { created } from "@ps/application/http/builder/created.ts";
import { badRequest } from "@ps/application/http/builder/badRequest.ts";
import { internalServerError } from "@ps/application/http/builder/internalServerError.ts";
import { CreateMeetingEventServiceImpl } from "@ps/domain_impl/schedule/event/createMeeting/CreateMeetingEventServiceImpl.ts";

export class CreateMeetingEventControllerImpl
    implements CreateMeetingEventController {
    constructor(
        private readonly service: CreateMeetingEventServiceImpl,
    ) {}

    public async handle(
        request: HTTPRequest<CreateMeetingEvent, never>,
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

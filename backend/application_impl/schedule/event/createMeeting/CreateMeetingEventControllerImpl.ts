import type { CreateMeetingEvent } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEvent.ts";
import type { CreateMeetingEventService } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { CreateMeetingEventController } from "@ps/application/schedule/event/createMeeting/CreateMeetingEventController.ts";

import { created } from "@ps/application_impl/http/builder/200/created.ts";
import { errorHandler } from "../../../http/error/errorHandler.ts";

export class CreateMeetingEventControllerImpl implements CreateMeetingEventController {
    constructor(private readonly createMeetingEventService: CreateMeetingEventService) {}

    public handle(req: HTTPRequest<CreateMeetingEvent>): Promise<HTTPResponse> {
        return errorHandler(async () => {
            await this.createMeetingEventService.create(req.body);
            return created();
        });
    }
}

import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UpdateMeetingEvent } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEvent.ts";
import type { UpdateMeetingEventService } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEventService.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";
import type { UpdateMeetingEventController } from "@ps/application/schedule/event/updateMeeting/UpdateMeetingEventController.ts";

import { noContent } from "@ps/application_impl/http/builder/200/noContent.ts";

export class UpdateMeetingEventControllerImpl implements UpdateMeetingEventController {
    constructor(private readonly updateMeetingEventService: UpdateMeetingEventService) {}

    public async handle(
        userId: User["id"],
        req: HTTPRequest<UpdateMeetingEvent, IdParam>,
    ): Promise<HTTPResponse> {
        await this.updateMeetingEventService.update(userId, req.params.id, req.body);
        return noContent();
    }
}

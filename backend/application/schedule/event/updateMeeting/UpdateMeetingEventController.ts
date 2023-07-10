import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateMeetingEvent } from "@ps/domain/schedule/event/updateMeeting/UpdateMeetingEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

export type UpdateMeetingEventController = {
    readonly handle: (
        req: HTTPRequest<UpdateMeetingEvent, IdParam<Event["id"]>>,
    ) => Promise<HTTPResponse>;
};

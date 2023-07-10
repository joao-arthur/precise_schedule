import type { CreateMeetingEvent } from "@ps/domain/schedule/event/createMeeting/CreateMeetingEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type CreateMeetingEventController = {
    readonly handle: (req: HTTPRequest<CreateMeetingEvent>) => Promise<HTTPResponse>;
};

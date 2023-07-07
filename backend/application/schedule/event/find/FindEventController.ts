import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

export type FindEventController = {
    readonly handle: (
        request: HTTPRequest<never, IdParam<Event["id"]>>,
    ) => Promise<HTTPResponse>;
};

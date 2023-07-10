import type { Event } from "@ps/domain/schedule/event/Event.ts";
import type { UpdateDateEvent } from "@ps/domain/schedule/event/updateDate/UpdateDateEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

export type UpdateDateEventController = {
    readonly handle: (
        req: HTTPRequest<UpdateDateEvent, IdParam<Event["id"]>>,
    ) => Promise<HTTPResponse>;
};

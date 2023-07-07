import type { CreateDateEvent } from "@ps/domain/schedule/event/createDate/CreateDateEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type CreateDateEventController = {
    readonly handle: (
        request: HTTPRequest<CreateDateEvent, never>,
    ) => Promise<HTTPResponse>;
};

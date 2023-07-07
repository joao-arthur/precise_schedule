import type { CreateEventModel } from "@ps/domain/schedule/event/create/CreateEventModel.ts";
import type { HTTPRequest } from "../../../http/HTTPRequest.ts";
import type { HTTPResponse } from "../../../http/HTTPResponse.ts";

export type CreateEventController = {
    readonly handle: (
        request: HTTPRequest<CreateEventModel, never>,
    ) => Promise<HTTPResponse>;
};

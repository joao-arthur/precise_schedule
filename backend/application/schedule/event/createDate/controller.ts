import type { User } from "@ps/domain/schedule/user/User.ts";
import type { CreateDateEvent } from "@ps/domain/schedule/event/createDate/CreateDateEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type CreateDateEventController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<CreateDateEvent>,
    ) => Promise<HTTPResponse>;
};

import type { User } from "@ps/domain/schedule/user/User.ts";
import type { CreateBirthdayEvent } from "@ps/domain/schedule/event/createBirthday/CreateBirthdayEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type CreateBirthdayEventController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<CreateBirthdayEvent>,
    ) => Promise<HTTPResponse>;
};

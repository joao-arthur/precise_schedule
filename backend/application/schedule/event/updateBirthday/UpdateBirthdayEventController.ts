import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UpdateBirthdayEvent } from "@ps/domain/schedule/event/updateBirthday/UpdateBirthdayEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

export type UpdateBirthdayEventController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<UpdateBirthdayEvent, IdParam>,
    ) => Promise<HTTPResponse>;
};

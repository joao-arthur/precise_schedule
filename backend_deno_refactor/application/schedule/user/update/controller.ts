import type { User } from "@ps/domain/schedule/user/model.ts";
import type { UserUpdate } from "@ps/domain/schedule/user/update/model.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";

export type UserUpdateController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<UserUpdate>,
    ) => Promise<HTTPResponse>;
};

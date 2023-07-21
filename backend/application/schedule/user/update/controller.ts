import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UpdateUserModel } from "@ps/domain/schedule/user/update/UpdateUserModel.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type UpdateUserController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<UpdateUserModel>,
    ) => Promise<HTTPResponse>;
};

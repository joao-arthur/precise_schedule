import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UpdateUserModel } from "@ps/domain/schedule/user/update/UpdateUserModel.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

export type UpdateUserController = {
    readonly handle: (
        request: HTTPRequest<UpdateUserModel, IdParam<User["id"]>>,
    ) => Promise<HTTPResponse>;
};

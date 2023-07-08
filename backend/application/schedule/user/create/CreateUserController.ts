import type { CreateUserModel } from "@ps/domain/schedule/user/create/CreateUserModel.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type CreateUserController = {
    readonly handle: (
        request: HTTPRequest<CreateUserModel>,
    ) => Promise<HTTPResponse>;
};

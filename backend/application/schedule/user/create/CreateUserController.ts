import type { CreateUserModel } from "@ps/domain/schedule/user/create/CreateUserModel.ts";
import type { HTTPRequest } from "../../../http/HTTPRequest.ts";
import type { HTTPResponse } from "../../../http/HTTPResponse.ts";

export type CreateUserController = {
    readonly handle: (
        request: HTTPRequest<CreateUserModel, never>,
    ) => Promise<HTTPResponse>;
};

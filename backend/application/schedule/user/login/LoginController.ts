import type { LoginModel } from "@ps/domain/schedule/user/login/LoginModel.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type LoginController = {
    readonly handle: (
        request: HTTPRequest<LoginModel, undefined>,
    ) => Promise<HTTPResponse>;
};

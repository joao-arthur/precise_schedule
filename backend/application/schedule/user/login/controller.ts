import type { UserLoginModel } from "@ps/domain/schedule/user/login/model.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";

export type UserLoginController = {
    readonly handle: (req: HTTPRequest<UserLoginModel>) => Promise<HTTPResponse>;
};

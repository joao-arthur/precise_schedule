import type { UserCreateModel } from "@ps/domain/schedule/user/create/model.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";

export type UserCreateController = {
    readonly handle: (req: HTTPRequest<UserCreateModel>) => Promise<HTTPResponse>;
};

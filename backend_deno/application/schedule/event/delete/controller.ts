import type { User } from "@ps/domain/schedule/user/model.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { IdParam } from "../../../http/IdParam.ts";

export type EventDeleteController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<undefined, IdParam>,
    ) => Promise<HTTPResponse>;
};

import type { User } from "@ps/domain/schedule/user/model.ts";
import type { PartyUpdateModel } from "@ps/domain/schedule/event/party/update/model.ts";
import type { HTTPRequest } from "../../../../http/request/model.ts";
import type { HTTPResponse } from "../../../../http/response/model.ts";
import type { IdParam } from "../../../../http/IdParam.ts";

export type PartyUpdateController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<PartyUpdateModel, IdParam>,
    ) => Promise<HTTPResponse>;
};

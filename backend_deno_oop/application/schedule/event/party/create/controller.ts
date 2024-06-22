import type { User } from "@ps/domain/schedule/user/model.ts";
import type { PartyCreateModel } from "@ps/domain/schedule/event/party/create/model.ts";
import type { HTTPRequest } from "../../../../http/request/model.ts";
import type { HTTPResponse } from "../../../../http/response/model.ts";

export type PartyCreateController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<PartyCreateModel>,
    ) => Promise<HTTPResponse>;
};

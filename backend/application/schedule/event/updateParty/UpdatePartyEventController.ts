import type { User } from "@ps/domain/schedule/user/User.ts";
import type { UpdatePartyEvent } from "@ps/domain/schedule/event/updateParty/UpdatePartyEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";
import type { IdParam } from "@ps/application/http/IdParam.ts";

export type UpdatePartyEventController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<UpdatePartyEvent, IdParam>,
    ) => Promise<HTTPResponse>;
};

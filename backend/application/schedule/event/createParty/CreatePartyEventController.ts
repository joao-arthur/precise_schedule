import type { User } from "@ps/domain/schedule/user/User.ts";
import type { CreatePartyEvent } from "@ps/domain/schedule/event/createParty/CreatePartyEvent.ts";
import type { HTTPRequest } from "@ps/application/http/HTTPRequest.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type CreatePartyEventController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<CreatePartyEvent>,
    ) => Promise<HTTPResponse>;
};

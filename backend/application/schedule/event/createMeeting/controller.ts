import type { User } from "@ps/domain/schedule/user/model.ts";
import type { MeetingCreateModel } from "@ps/domain/schedule/event/meeting/create/model.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";

export type MeetingCreateController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<MeetingCreateModel>,
    ) => Promise<HTTPResponse>;
};

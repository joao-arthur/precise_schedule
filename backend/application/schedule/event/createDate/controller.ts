import type { User } from "@ps/domain/schedule/user/model.ts";
import type { DateCreateModel } from "@ps/domain/schedule/event/date/create/model.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";

export type DateCreateController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<DateCreateModel>,
    ) => Promise<HTTPResponse>;
};

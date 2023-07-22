import type { User } from "@ps/domain/schedule/user/model.ts";
import type { DateUpdateModel } from "@ps/domain/schedule/event/date/update/model.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { IdParam } from "../../../http/IdParam.ts";

export type DateUpdateController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<DateUpdateModel, IdParam>,
    ) => Promise<HTTPResponse>;
};

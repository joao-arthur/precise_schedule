import type { User } from "@ps/domain/schedule/user/model.ts";
import type { BirthdayUpdateModel } from "@ps/domain/schedule/event/birthday/update/model.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";
import type { IdParam } from "../../../http/IdParam.ts";

export type BirthdayUpdateController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<BirthdayUpdateModel, IdParam>,
    ) => Promise<HTTPResponse>;
};

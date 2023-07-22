import type { User } from "@ps/domain/schedule/user/model.ts";
import type { BirthdayCreateModel } from "@ps/domain/schedule/event/birthday/create/model.ts";
import type { HTTPRequest } from "../../../http/request/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";

export type BirthdayCreateController = {
    readonly handle: (
        userId: User["id"],
        req: HTTPRequest<BirthdayCreateModel>,
    ) => Promise<HTTPResponse>;
};

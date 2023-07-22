import type { User } from "@ps/domain/schedule/user/model.ts";
import type { HTTPResponse } from "../../../http/response/model.ts";

export type FindAllEventController = {
    readonly handle: (userId: User["id"]) => Promise<HTTPResponse>;
};

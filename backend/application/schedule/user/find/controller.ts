import type { User } from "@ps/domain/schedule/user/User.ts";
import type { HTTPResponse } from "@ps/application/http/HTTPResponse.ts";

export type FindUserController = {
    readonly handle: (userId: User["id"]) => Promise<HTTPResponse>;
};

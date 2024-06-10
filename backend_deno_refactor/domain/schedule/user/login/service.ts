import type { Result } from "../../../lang/result.ts";
import type { Session } from "../../../session/model.ts";
import type { UserLoginModel } from "./model.ts";

export type UserLoginService = {
    readonly userLogin: (user: UserLoginModel) => Promise<Result<Session>>;
};

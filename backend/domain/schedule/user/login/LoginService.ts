import type { Session } from "../../../session/Session.ts";
import type { LoginModel } from "./LoginModel.ts";

export type LoginService = {
    readonly login: (user: LoginModel) => Promise<Session>;
};

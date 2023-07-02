import type { User } from "../User.ts";
import type { LoginModel } from "./LoginModel.ts";

export type LoginService = {
    readonly login: (user: LoginModel) => Promise<User>;
};

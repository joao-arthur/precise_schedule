import type { User } from "../User.ts";

export type LoginModel = {
    readonly username: User["username"];
    readonly password: User["password"];
};

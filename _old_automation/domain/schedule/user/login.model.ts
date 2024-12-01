import type { User } from "./user.ts";

export type LoginModel = {
    readonly username: User["username"];
    readonly password: User["password"];
};

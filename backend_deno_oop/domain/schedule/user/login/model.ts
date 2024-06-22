import type { User } from "../model.ts";

export type UserLoginModel = {
    readonly username: User["username"];
    readonly password: User["password"];
};

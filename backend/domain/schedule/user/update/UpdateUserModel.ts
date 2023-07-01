import type { User } from "../User.ts";

export type UpdateUserModel = {
    readonly email: User["email"];
    readonly username: User["username"];
    readonly password: User["password"];
};

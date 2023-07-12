import type { User } from "./user.ts";

export type CreateUserModel = {
    readonly email: User["email"];
    readonly username: User["username"];
    readonly password: User["password"];
};

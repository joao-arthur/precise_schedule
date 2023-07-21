import type { User } from "../User.ts";

export type FindUserModel = {
    readonly firstName: User["firstName"];
    readonly birthdate: User["birthdate"];
    readonly email: User["email"];
    readonly username: User["username"];
    readonly password: User["password"];
};

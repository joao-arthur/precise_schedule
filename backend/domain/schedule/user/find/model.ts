import type { User } from "../model.ts";

export type UserFindModel = {
    readonly firstName: User["firstName"];
    readonly birthdate: User["birthdate"];
    readonly email: User["email"];
    readonly username: User["username"];
    readonly password: User["password"];
};

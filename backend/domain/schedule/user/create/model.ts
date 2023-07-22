import type { User } from "../model.ts";

export type UserCreateModel = {
    readonly email: User["email"];
    readonly firstName: User["firstName"];
    readonly birthdate: User["birthdate"];
    readonly username: User["username"];
    readonly password: User["password"];
};

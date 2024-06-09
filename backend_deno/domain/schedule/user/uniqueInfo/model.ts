import type { User } from "../model.ts";

export type UserUniqueInfoModel = {
    readonly username: User["username"];
    readonly email: User["email"];
};

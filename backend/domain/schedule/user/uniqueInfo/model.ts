import type { User } from "../User.ts";

export type UniqueInfoModel = {
    readonly username: User["username"];
    readonly email: User["email"];
};

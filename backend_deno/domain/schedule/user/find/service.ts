import type { User } from "../model.ts";
import type { UserFindModel } from "./model.ts";

export type UserFindService = {
    readonly findById: (id: User["id"]) => Promise<User>;
    readonly findByIdMapped: (id: User["id"]) => Promise<UserFindModel>;
    readonly findByCredentials: (
        username: User["username"],
        password: User["password"],
    ) => Promise<User>;
};
